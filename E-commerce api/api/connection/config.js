const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const url = "mongodb+srv://hhhe72104:fPbh9LzbZ0vJHQvU@cluster0.3cmm2.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

exports.connectToDatabase = asyncHandler(async () => {
 
        await mongoose.connect(url, { dbName: "ecommerce" });
        console.log("Connected to the database");
    
});