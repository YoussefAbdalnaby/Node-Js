const slugify = require("slugify");
const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      unique: true,
      type: String,
      //  required: [true, "the name is required"],
      minlength: [6, "minmum is 6"],
      maxlength: [32, "maxmuim is 32"],
      validate: {
        validator: function (name) {
          return /^[a-zA-Z0-9 ]+$/.test(name);
        },
      },
    },
    slug: {
      type: String,
      minlength: [6, "minmum is 6"],
      maxlength: [32, "maxmuim is 32"],
      lowercase: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true },
);
  subCategorySchema.pre("validate", function (next) {
  console.log("the validation is starting");
  next();
});
  subCategorySchema.post("validate", function (next) {
  console.log("the validation is ending " + this.name);
});
  subCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const SubCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = SubCategory;
