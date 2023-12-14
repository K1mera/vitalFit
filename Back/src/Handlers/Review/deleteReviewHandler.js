const deleteReview = require("../../Controllers/Review/deleteReview");

const deleteReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteReview(id);
    return res
      .status(200)
      .json({ message: "La review ha sido eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = deleteReviewHandler;
