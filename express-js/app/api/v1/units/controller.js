const {
  unitGetAll,
  unitCreate,
  unitFind,
  unitUpdate,
  unitDestroy,
} = require('../../../services/unit');
const { StatusCodes } = require('http-status-codes');

const getAll = async (req, res, next) => {
  try {
    const result = await unitGetAll(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await unitCreate(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await unitFind(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await unitUpdate(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await unitDestroy(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  create,
  find,
  update,
  destroy,
};
