const { Product, Category } = require("../db");
const json = require("../data.json");

async function postProducts() {
  const products = await Promise.all(
    json.map(
      async ({
        name,
        price,
        size,
        stock,
        image,
        flavour,
        category,
        pre_description,
        description,
      }) => {
        const newProduct = await Product.create({
          name,
          price,
          size,
          stock,
          image,
          flavour,
          pre_description,
          description,
        });

        const cat = await Category.findOne({ where: { name: category } });
        if (cat) {
          await newProduct.setCategory(cat);
        }

        return newProduct;
      }
    )
  );

  return products;
}

module.exports = postProducts;

/* const { Product, Category } = require("../db");
const json = require("../data.json");

async function postProducts() {
  const products = json.forEach(
    async ({
      name,
      price,
      size,
      stock,
      image,
      flavour,
      category,
      pre_description,
      description,
    }) => {
      const newProduct = await Product.create({
        name,
        price,
        size,
        stock,
        image,
        flavour,
        pre_description,
        description,
      });
      const cat = await Category.findOne({ where: { name: category } });
      newProduct.setCategory(cat);
      return newProduct;
    }
  );
  
  return products;
}

module.exports = postProducts; */
/*  const productos = json.map((prod) => ({
  // id: prod.id,
  name: prod.name,
  price: prod.price,
  size: prod.size,
  stock: prod.stock,
  image: prod.image,
  flavour: prod.flavour,
  description: prod.description,
  pre_description: prod.pre_description,
  categoryId: prod.categoryId,
}));

await Product.bulkCreate(productos); */
