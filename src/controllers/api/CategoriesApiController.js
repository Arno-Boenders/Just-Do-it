import Category from "../../models/Category.js";

export const getCategory = async (req, res, next) => {
  const id = req.params.id;
  const categories = await Category.query()
    .findById(id)
    .withGraphFetched("tasks");
  res.json({
    categories,
  });
};

export const getCategories = async (req, res, next) => {
  const categories = await Category.query();
  res.json({
    categories,
  });
};
