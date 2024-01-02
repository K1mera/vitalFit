require("dotenv").config()
const { ACCESS_TOKEN } = process.env;

const { MercadoPagoConfig, Preference } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

const postPreference = async ({ title, unit_price, quantity }) => {
        const body = {
            items: [
                {
                    title,
                    unit_price: Number(unit_price),
                    quantity: Number(quantity)
                }
            ],
        }
        console.log(body);
        const preference = new Preference(client)
        const result = await preference.create({ body })

        return {id: result.id}
}

module.exports = postPreference