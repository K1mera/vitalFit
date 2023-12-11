const { Router } = require("express");
const router = Router();

const postProductHandler = require("../Handlers/Products/postProductHandler");
const getCategory = require("../Controllers/Category/getCategory");
const getProductsHandler = require("../Handlers/Products/getProductsHandler");
const postManyProductsHandler = require("../utils/postManyProductsHandler");
const getProductsByIdHandler = require("../Handlers/Products/getProductByIdHandler");
const postSubCategoryHandler = require("../Handlers/subCategory/postSubHandler");
const postReviewHandler = require("../Handlers/Review/postReviewHandler");
const postCategoryHandler = require("../Handlers/Category/postCategoryHandler");

//products
router.get("/", getProductsHandler);
router.post("/", postProductHandler);
router.get("/:id", getProductsByIdHandler);

//Categories
router.get("/category", getCategory);
router.post("/category", postCategoryHandler);

//subCategories
router.post("/subcat", postSubCategoryHandler);

//Reviews
router.post("/review", postReviewHandler);

//Many
router.post("/many", postManyProductsHandler);

module.exports = router;
