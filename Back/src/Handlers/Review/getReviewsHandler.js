const getReviews = require("../../Controllers/Review/getReviews");

const getReviewsHandler = async (req, res) => {
  const data = req.query;
  try {
    const response = await getReviews(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getReviewsHandler;
