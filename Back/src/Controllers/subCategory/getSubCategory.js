const { SubCategory, Category } = require("../../db");
const getSubCategory = async () => {
  const subCat = await SubCategory.findAll({
    include: {
      model: Category,
      attributes: ["name"],
    },
  });
  return subCat;
};

module.exports = getSubCategory;
