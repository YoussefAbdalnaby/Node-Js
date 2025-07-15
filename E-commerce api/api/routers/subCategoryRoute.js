const express = require("express");
const SubCategoryService = require("../services/subCategoryService.js");
const SubCategoryValidator = require("../utils/validators/subCategoryVaildtor.js");

const router = express.Router({mergeParams :true});
router
  .post(
    "/",
    SubCategoryValidator.createSubCategoryVaildtor,
    SubCategoryService.createSubCategory,
  )
  .get("/", SubCategoryService.getAllSubCategories)
  .get("/name/:name", SubCategoryService.getSubCategoryByName)
  .get(
    "/id/:id",
    SubCategoryValidator.getSubCategoryValidator,
    SubCategoryService.getSubCategoryById,
  ).put(
    "/:id",
    SubCategoryValidator.updateSubCategoryValidator,
    SubCategoryService.updateSubCategory,
  )
  .delete(
    "/:id",
    SubCategoryValidator.deleteSubCategoryValidator,
    SubCategoryService.deleteSubCategory,
  );; // Apply validation here

module.exports = router;
