const getUserByName = require("../../Controllers/User/getUserByNameController");

async function getUserByNameHandler(req, res) {
  const { name } = req.query;
  try {
    const response = getUserByName(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = getUserByNameHandler;
