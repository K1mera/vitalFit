const { User } = require("../../db");

async function putUser(id, data) {
  const editUser = await User.findByPk(id);

  if (!editUser) {
    throw new Error("No se encontró un usuario con el ID proporcionado");
  }

  editUser.set(data);
  await editUser.save(); // Asegúrate de esperar a que la operación save se complete

  return editUser;
}

module.exports = putUser;
