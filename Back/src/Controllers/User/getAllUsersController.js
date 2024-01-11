const { User } = require("../../db");

async function getAllUsers() {
  const users = await User.findAll();
  if (!users) throw new Error("No hay usuarios en la base de datos.");
  return users;
}

module.exports = getAllUsers;
