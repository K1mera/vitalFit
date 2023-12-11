const { User } = require("../../db");

const postUser = async (data) => {
  const { email, password, role } = data;

  const created = await User.create({ email, password, role });

  return created;
};
module.exports = postUser;
