const getOrder = require("../../Controllers/Order/getOrderController");

const getOrderHandler = async (req, res) => {
  try {
    const response = await getOrder();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getOrderHandler;
