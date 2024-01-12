const postOrderController = require("../../Controllers/Order/postOrderController");

const postOrderHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = await postOrderController(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postOrderHandler;
