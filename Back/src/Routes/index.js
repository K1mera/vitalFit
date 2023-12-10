const { Router } = require("express");
const router = Router();

const postProductHandler = require("../Handlers/ProductsHandlers/postProductHandler");
const getCategory = require("../Controllers/Category/getCategory");
const postCategory = require("../Controllers/Category/postCategory");
const getProductsHandler = require("../Handlers/ProductsHandlers/getProductsHandler");
const postManyProductsHandler = require("../utils/postManyProductsHandler");
const getProductsByIdHandler = require("../Handlers/ProductsHandlers/getProductByIdHandler");

//products
router.get("/", getProductsHandler);
router.post("/", postProductHandler);
router.get("/:id", getProductsByIdHandler);

//Categories
router.get("/category", getCategory);
router.post("/category", postCategory);

//Many
router.post("/many", postManyProductsHandler);

module.exports = router;
