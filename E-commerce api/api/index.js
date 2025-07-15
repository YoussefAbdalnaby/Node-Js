const express = require("express");
const connection = require("./connection/config.js");
const categoryRouter = require("./routers/categoryRoute.js");
const subCategoryRouter = require("./routers/subCategoryRoute.js");
const brandRouter = require("./routers/brandRoute.js");

const ApiError = require("./utils/apiError.js");
const globalError = require("./middlewares/errorMiddleware.js");
const app = express();
process.env.NODE_ENV = "development";
console.log(process.env.NODE_ENV);
// Connect to the database

// Middleware
app.use(express.json()); // This is sufficient for parsing JSON bodies

// Routes
app.use("/api/categories", categoryRouter);
app.use("/api/subCategories", subCategoryRouter);
app.use("/api/brands", brandRouter);
// Prefixing routes to avoid confusion

app.use("*", (req, res, next) => {
  next(new ApiError(`this route is not found ${req.originalUrl}`, 404));
});

app.use(globalError);

// Start the server
const server = app.listen(3000, async () => {
  await connection.connectToDatabase();
  console.log("Server is running on port 3000");
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection ", err.message);
  server.close(() => {
    console.log("server closed");
    process.exit(1);
  });
});
