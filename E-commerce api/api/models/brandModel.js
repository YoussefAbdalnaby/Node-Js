const mongoose = require("mongoose");
const slugify = require("slugify");

const brandSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

  brandSchema.pre("validate", function (next) {
  console.log("the validation is starting");
  next();
});
  brandSchema.post("validate", function (next) {
  console.log("the validation is ending " + this.name);
});
  brandSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;
