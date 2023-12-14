const getAllUsers = require("../../Controllers/User/getAllUsersController");

async function getAllUsersHandler(req, res) {
  try {
    const response = await getAllUsers();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = getAllUsersHandler;
