const { Product } = require("../db");
const json = require("../data.json");

async function postProducts() {
  const productos = json.map((prod) => ({
    // id: prod.id,
    name: prod.name,
    price: prod.price,
    size: prod.size,
    stock: prod.stock,
    image: prod.image,
    flavour: prod.flavour,
    description: prod.description,
  }));

  return await Product.bulkCreate(productos);
}

module.exports = postProducts;
