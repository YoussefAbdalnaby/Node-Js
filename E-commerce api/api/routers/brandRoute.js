const express = require("express");
const brandService = require("../services/brandService.js");
const router = express.Router();
const { param, validationResult } = require("express-validator");
const BrandValidator = require("../utils/validators/brandVaildtor.js");

// Validation middleware for id
router
  .post(
    "/",
    BrandValidator.createBrandVaildtor,
    brandService.createBrand,
  )
  .get("/", brandService.getAllBrands)
  .get("/name/:name", brandService.getBrandByName)
  .get(
    "/id/:id",
    BrandValidator.getBrandValidator,
    brandService.getBrandById,
  ) // Apply validation here
  .put(
    "/:id",
    BrandValidator.updateBrandValidator,
    brandService.updateBrand,
  )
  .delete(
    "/:id",
    BrandValidator.deleteBrandValidator,
    brandService.deleteBrand,
  );

module.exports = router;
