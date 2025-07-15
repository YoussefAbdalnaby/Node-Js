const express = require("express");
const categoryService = require("../services/categoryService.js");
const router = express.Router();
const { param, validationResult } = require("express-validator");
const CategoryValidator = require("../utils/validators/categoryValidator.js");
const subCategoryRouter = require("../routers/subCategoryRoute.js");

// Validation middleware for id
router.use("/:categoryId/subCategories",subCategoryRouter)
router
  .post(
    "/",
    CategoryValidator.createCategoryVaildtor,
    categoryService.createCategory,
  )
  .get("/", categoryService.getAllCategories)
  .get("/name/:name", categoryService.getCategoryByName)
  .get(
    "/id/:id",
    CategoryValidator.getCategoryValidator,
    categoryService.getCategoryById,
  ) // Apply validation here
  .put(
    "/:id",
    CategoryValidator.updateCategoryValidator,
    categoryService.updateCategory,
  )
  .delete(
    "/:id",
    CategoryValidator.deleteCategoryValidator,
    categoryService.deleteCategory,
  );

module.exports = router;
