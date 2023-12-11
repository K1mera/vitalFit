const postReview = require("../../Controllers/Review/postReview");

const postReviewHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = await postReview(data);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postReviewHandler;
