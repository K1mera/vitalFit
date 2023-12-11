const postSubCategory = require("../../Controllers/subCategory/postSubCategory");

const postSubCategoryHandler = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const response = await postSubCategory(data);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postSubCategoryHandler;
