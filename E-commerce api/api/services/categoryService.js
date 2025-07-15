const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError.js");

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = new Category({ name });
  const result = await category.save(); // Use await for better error handling
  res.status(201).json({ message: "Category created successfully" });
});
exports.getAllCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  res.status(200).json({ counter: categories.length, data: categories });
});
exports.getCategoryByName = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  const category = await Category.findOne({ name });
  if (!category) {
    next(new ApiError(`this name is not found ${name}`, 404));
  }
  res.status(200).json({ data: category });
});
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    next(new ApiError(`this id is not found ${id}`, 404));
    // res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: category });
});
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const newName = req.body.name;
  const id = req.params.id;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name: newName },
    { new: true },
  );
  if (!category) {
    next(new ApiError(`this category is not found ${id}`, 404));
  }
  await category.save();
  res.status(200).json({ data: category });
});
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) {
    next(new ApiError(`this category is not found ${id}`, 404));
  }

  res.status(200).json({ message: "category deleted " });
});
