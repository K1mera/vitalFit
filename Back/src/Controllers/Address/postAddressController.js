const { Address, User, Order } = require("../../db");

const postAddress = async (data) => {
  const { document, phone, street, region, userId, orderId } = data;

  const createAddress = await Address.create({
    document,
    phone,
    street,
    region,
  });

  const findUser = await User.findOne({ where: { id: userId } });

  const findOrder = await Order.findOne({ where: { id: orderId } });

  createAddress.setUser(findUser);
  createAddress.setOrder(findOrder);

  return createAddress;
};
module.exports = postAddress;
