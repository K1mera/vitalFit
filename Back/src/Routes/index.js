const { Router } = require("express");
const router = Router();

//Products
const postProductHandler = require("../Handlers/Products/postProductHandler");
const getProductsHandler = require("../Handlers/Products/getProductsHandler");
const postManyProductsHandler = require("../utils/postManyProductsHandler");
const getProductsByIdHandler = require("../Handlers/Products/getProductByIdHandler");
const deleteProductHandler = require("../Handlers/Products/deleteProductHandler");
const activarDesactivarHandler = require("../Handlers/Products/activarDesactivarHandler");
const putProductHandler = require("../Handlers/Products/putProductHandler");

//Review
const postReviewHandler = require("../Handlers/Review/postReviewHandler");
const putReviewHandler = require("../Handlers/Review/putReviewHandler");
const getReviewsHandler = require("../Handlers/Review/getReviewsHandler");
const deleteReviewHandler = require("../Handlers/Review/deleteReviewHandler");

//Categories
const postCategoryHandler = require("../Handlers/Category/postCategoryHandler");
const getCategoryHandler = require("../Handlers/Category/getCategoryHandler");

//Users
const postUserHandler = require("../Handlers/User/postUserHandler");
const getAllUsersHandler = require("../Handlers/User/getAllUsersHandler");
const getUserByIdHandler = require("../Handlers/User/getUserByIdHandler");
const getUserByNameHandler = require("../Handlers/User/getUserByNameHandler");

//Address
const postAddressHandler = require("../Handlers/Address/postAddressHandler");
const putUserHandler = require("../Handlers/User/putUserHandler");
const putCategoryHandler = require("../Handlers/Category/putCategoryHandler");
const deleteCategoryHandler = require("../Handlers/Category/deleteCategoryHandler");

//MercadoPAgo
const postPreferenceHandler = require("../Handlers/MercadoPago/postPreferenceHandler")

//Products
router.get("/", getProductsHandler);
router.post("/", postProductHandler); //body
router.get("/product/:id", getProductsByIdHandler); //params
router.put("/product/:id", putProductHandler); //params & body
router.delete("/product/:id", deleteProductHandler); //params
router.put("/activar-desactivar/:id", activarDesactivarHandler); //params & body

//Categories
router.get("/category", getCategoryHandler);
router.post("/category", postCategoryHandler); //body
router.put("/category/:id", putCategoryHandler); //body
router.delete("/category/:id", deleteCategoryHandler); //params

//Reviews
router.post("/review", postReviewHandler); //body
router.put("/review/:id", putReviewHandler); //body
router.get("/review", getReviewsHandler);
router.delete("/review/:id", deleteReviewHandler); //params

//Many
router.post("/many", postManyProductsHandler);

//User
router.post("/user", postUserHandler); //body
router.get("/user", getAllUsersHandler);
router.get("/user/:id", getUserByIdHandler); //params
router.get("/username", getUserByNameHandler); //query
router.put("/user", putUserHandler); //body

//Address
router.post("/addres", postAddressHandler);

//MercadoPago
router.post("/create_preference",postPreferenceHandler)

module.exports = router;
