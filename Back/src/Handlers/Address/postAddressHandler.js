const postAddress = require("../../Controllers/Address/postAddressController");

const postAddressHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = postAddress(data);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postAddressHandler;
