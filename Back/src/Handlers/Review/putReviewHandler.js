const putReview = require("../../Controllers/Review/putReview");

const putReviewHandler = async (req, res) => {
  const { id, data } = req.body;
  try {
    const response = await putReview(id, data);
    return res.status(200).json({ message: "Review modificada con éxito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = putReviewHandler;
