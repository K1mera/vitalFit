const { Order } = require("../../db");

const getOrder = async () => {
  const order = await Order.findAll();
  if (!order) throw new Error("No se encontraron ordenes");
  return order;
};

module.exports = getOrder;
