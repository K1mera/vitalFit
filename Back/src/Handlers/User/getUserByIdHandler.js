const getUserById = require("../../Controllers/User/getUserByIdController");

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const response = await getUserById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = getUserByIdHandler;
