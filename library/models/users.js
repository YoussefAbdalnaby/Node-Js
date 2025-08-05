const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { resolve } = require('dns');

const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const dbname = 'api';
const collectionName = 'tests';
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.3cmm2.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model(collectionName, userSchema);

exports.insertUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, { dbName: dbname })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("This user already exists.");
        } else {
          return bcrypt.hash(password, 10); // Ensure password is provided
        }
      })
      .then((hashedPassword) => {
        if (!hashedPassword) {
          throw new Error("Failed to hash password.");
        }
        const user = new User({ username: username, email: email, password: hashedPassword });
        return user.save();
      })
      .then((user) => {
        mongoose.disconnect();
        resolve(user);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};