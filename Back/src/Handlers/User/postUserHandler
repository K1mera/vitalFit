const postUser = require("../../Controllers/User/postUserControllers");

const postUserHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = await postUser(data);
    return res.status(200).json({ message: "Usuario creado con exito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUserHandler;
