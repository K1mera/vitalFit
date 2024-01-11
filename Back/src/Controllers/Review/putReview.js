const { Review } = require("../../db");

const putReview = async (id, data) => {
  const findReview = await Review.findByPk(id);
  findReview.set(data);
  findReview.save();
  return findReview;
};

module.exports = putReview;
