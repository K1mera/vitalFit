const { User } = require("../../db");

const postUser = async (data) => {
  const { email, password, role, name, lastName } = data;

  const created = await User.create({ email, password, role, name, lastName });

  return created;
};
module.exports = postUser;
