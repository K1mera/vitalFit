const { Router } = require("express");
const router = Router();

const postProductHandler = require("../Handlers/Products/postProductHandler");
const getProductsHandler = require("../Handlers/Products/getProductsHandler");
const postManyProductsHandler = require("../utils/postManyProductsHandler");
const getProductsByIdHandler = require("../Handlers/Products/getProductByIdHandler");
const postReviewHandler = require("../Handlers/Review/postReviewHandler");
const postCategoryHandler = require("../Handlers/Category/postCategoryHandler");
const postUserHandler = require("../Handlers/User/postUserHandler");
const getProductByNameHandler = require("../Handlers/Products/getProductByNameHandler");
const putProductHandler = require("../Handlers/Products/putProductHandler");
const getCategoryHandler = require("../Handlers/Category/getCategoryHandler");
const deleteProductHandler = require("../Handlers/Products/deleteProductHandler");
const activarDesactivarHandler = require("../Handlers/Products/activarDesactivarHandler");

//products
router.get("/", getProductsHandler);
router.post("/", postProductHandler);
router.get("/product/:id", getProductsByIdHandler);
router.get("/name", getProductByNameHandler);
router.put("/", putProductHandler);
router.delete("/product/:id", deleteProductHandler);
router.put("/activar-desactivar", activarDesactivarHandler);

//Categories
router.get("/category", getCategoryHandler);
router.post("/category", postCategoryHandler);

//Reviews
router.post("/review", postReviewHandler);

//Many
router.post("/many", postManyProductsHandler);

//User
router.post("/user", postUserHandler);

module.exports = router;
