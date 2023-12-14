const { User } = require("../../db");

async function putUser(id, data) {
  const editUser = await User.findByPk(id);
  editUser.set(data);
  editUser.save();
  return editUser;
}

module.exports = putUser;
