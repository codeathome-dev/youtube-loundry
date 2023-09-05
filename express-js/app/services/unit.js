const { Unit } = require('../db/models');
const { NotFoundError } = require('../errors');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');

const unitGetAll = async (req) => {
  let { keyword = '', page = 1, size = 10 } = req.query;

  let condition = {};

  if (keyword !== '') {
    condition = { ...condition, code: { [Op.like]: `%${keyword}%` } };
  }

  const { limit, offset } = getPagination(page, size);

  const result = await Unit.findAndCountAll({
    where: condition,
    limit,
    offset,
  });

  const response = getPagingData(result, page, limit);

  return response;
};

const unitCreate = async (req) => {
  const { name, code } = req.body;

  const result = await Unit.create({
    name,
    code,
  });

  return result;
};

const unitFind = async (req) => {
  const { id } = req.params;
  const result = await Unit.findOne({ where: { id: id } });
  if (!result) throw new NotFoundError(`No Unit with id : ${id}`);

  return result;
};

const unitUpdate = async (req) => {
  const { id } = req.params;
  const { name, code } = req.body;

  const result = await Unit.findOne({ where: { id } });

  if (!result) throw new NotFoundError(`No Unit with id : ${id}`);

  await result.update({ name, code });

  return result;
};

const unitDestroy = async (req) => {
  const { id } = req.params;

  const result = await Unit.findOne({ where: { id } });

  if (!result) throw new NotFoundError(`No Unit with id : ${id}`);

  await result.destroy({
    where: { id },
  });

  return result;
};

module.exports = {
  unitGetAll,
  unitCreate,
  unitFind,
  unitUpdate,
  unitDestroy,
};
