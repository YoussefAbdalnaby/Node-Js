const SubCategory = require("../models/subCategory.js");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError.js");

exports.createSubCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const subCategory = new SubCategory({ name, category });
  const result = await subCategory.save(); // Use await for better error handling
  res.status(201).json({ message: "SubCategory created successfully" });
});
exports.getAllSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const categoryId=req.params.categoryId;
  const skip = (page - 1) * limit;
  console.log('Requesting subcategories for categoryId:', categoryId);

  
   const filterObj = categoryId ? { category: categoryId } : {};
  const subCategories = await SubCategory.find(filterObj)
    .skip(skip)
    .limit(limit)
    
    
  res.status(200).json({ counter: subCategories.length, data: subCategories });
});
exports.getSubCategoryByName = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  const subCategory = await SubCategory.findOne({ name });
  if (!subCategory) {
    next(new ApiError(`this name is not found ${name}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    next(new ApiError(`this id is not found ${id}`, 404));
    // res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: subCategory });
});
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const newName = req.body.name;
  const category = req.body.category;
  const id = req.params.id;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name: newName, category: category },
    { new: true },
  );
  if (!subCategory) {
    next(new ApiError(`this category is not found ${id}`, 404));
  }
  await subCategory.save();
  res.status(200).json({ data: subCategory });
});
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findOneAndDelete({ _id: id });
  if (!subCategory) {
    next(new ApiError(`this category is not found ${id}`, 404));
  }

  res.status(200).json({ message: "category deleted " });
});
