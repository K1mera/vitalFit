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
const postAddressHandler = require("../Handlers/Address/postAddressHandler");
//products
router.get("/", getProductsHandler);
router.post("/", postProductHandler); //body
router.get("/product/:id", getProductsByIdHandler); //params
router.get("/name", getProductByNameHandler); //query
router.put("/", putProductHandler); //body
router.delete("/product/:id", deleteProductHandler); //params
router.put("/activar-desactivar", activarDesactivarHandler); //body

//Categories
router.get("/category", getCategoryHandler);
router.post("/category", postCategoryHandler); //body

//Reviews
router.post("/review", postReviewHandler); //body

//Many
router.post("/many", postManyProductsHandler);

//User
router.post("/user", postUserHandler); //body

//Address
router.post("/addres", postAddressHandler);

module.exports = router;
