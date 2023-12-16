const putUser = require("../../Controllers/User/putUserController");

async function putUserHandler(req, res) {
  const { id, data } = req.body;

  try {
    const response = await putUser(id, data);
    res
      .status(200)
      .json({ message: "El usuario ha sido modificado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = putUserHandler;
