const { Router } = require("express");
const router = Router();

const getProductsHandler = require("../Handlers/getProductsHandler");
const postProductsHandler = require("../Handlers/postProductsHandler");

router.post("/", postProductsHandler);
router.get("/", getProductsHandler);
// router.get("/products/:id", getProductsByIdHandler);
module.exports = router;
