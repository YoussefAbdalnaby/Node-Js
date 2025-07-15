const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware.js");

exports.createSubCategoryVaildtor = [
  check("name")
    .notEmpty()
    .withMessage("sub Category name  required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  check("category")
    .notEmpty()
    .withMessage("Categoryid  required")
    .isMongoId()
    .withMessage("Invalid category id format"),
  validatorMiddleware,
];
exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name").optional(),
  validatorMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];