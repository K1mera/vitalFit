const { Order, Oder_Line, Product, User } = require("../../db");

const postOrder = async (data) => {
  const { total, subTotal, iva, paymentMethod, status } = data;

  const createOrder = await Order.create({
    total,
    subTotal,
    iva,
    paymentMethod,
    status,
  });
  const findProduct = await Product.findOne({ where: { id: productId } });
  const findUser = await User.findOne({ where: { id: userId } });

  createOrder.setProduct(findProduct);
  createOrder.setUser(findUser);

  return createOrder;
};
module.exports = postOrder;
