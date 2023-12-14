const { Review } = require("../../db");

const deleteReview = async (id) => {
  const deleteReview = await Review.findByPk(id);
  if (!deleteReview) throw new Error("Esta review no existe");
  deleteReview.destroy();
  return deleteReview;
};

module.exports = deleteReview;
