const createTokenUser = (user) => {
  return { fullname: user.fullname, id: user.id, role: user.role };
};

module.exports = createTokenUser;
