const { User } = require("../../db");

async function getUserByName(name) {
  const user = await User.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });
  if (!user)
    throw new Error("El nombre proporcionado no coincide con ningun usuario");
  return user;
}

module.exports = getUserByName;
