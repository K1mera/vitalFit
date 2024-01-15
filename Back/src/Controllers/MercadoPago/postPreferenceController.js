require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

const { MercadoPagoConfig, Preference } = require("mercadopago");
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

const postPreference = async ({ userId, userEmail, items, orderId }) => {
  const body = {
    items: /* [
      {
        title,
        unit_price: Number(unit_price),
        quantity: Number(quantity),
      },
    ], */ items,
    back_urls: {
      success: "http://localhost:5173/checkout/successfull",
      failure: "http://localhost:5173/home",
      pending: "http://localhost:5173/home",
    },
    external_reference: orderId + "-_" + userId + "-_" + userEmail,
    auto_return: "approved",
  };

  const preference = new Preference(client);
  const result = await preference.create({ body });

  return { id: result.id };
};

module.exports = postPreference;
