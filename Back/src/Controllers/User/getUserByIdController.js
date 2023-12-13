const { User } = require("../../db");

async function getUserById(id) {
  const user = await User.findByPk(id);

  if (!user) throw new Error("El id proporcionado no corresponde a un usuario");
  return user;
}

module.exports = getUserById;
