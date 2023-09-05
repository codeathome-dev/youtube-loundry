const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: contents } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, contents, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = Number(size);

  const offset = page ? (Number(page) - 1) * limit : 0;

  return { limit, offset };
};

module.exports = { getPagingData, getPagination };
