const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError.js");

exports.createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const brand = new Brand({ name });
  const result = await brand.save(); // Use await for better error handling
  res.status(201).json({ message: "brand created successfully" });
});
exports.getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const skip = (page - 1) * limit;
  const brands = await Brand.find().skip(skip).limit(limit);
  res.status(200).json({ counter: brands.length, data: brands });
});
exports.getBrandByName = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  const brand = await Brand.findOne({ name });
  if (!brand) {
    next(new ApiError(`this name is not found ${name}`, 404));
  }
  res.status(200).json({ data: brand });
});
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findById(id);
  if (!brand) {
    next(new ApiError(`this id is not found ${id}`, 404));
    // res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: brand });
});
exports.updateBrand= asyncHandler(async (req, res, next) => {
  const newName = req.body.name;
  const id = req.params.id;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name: newName },
    { new: true },
  );
  if (!brand) {
    next(new ApiError(`this Brand is not found ${id}`, 404));
  }
  await Brand.save();
  res.status(200).json({ data: brand });
});
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findOneAndDelete({ _id: id });
  if (!brand) {
    next(new ApiError(`this brand is not found ${id}`, 404));
  }

  res.status(200).json({ message: "brand deleted " });
});
