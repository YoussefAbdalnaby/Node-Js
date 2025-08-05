const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];

const dbname = 'library';
const collectionName = 'users';

const uri=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.3cmm2.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`
const userSchema=mongoose.Schema({
  name:String,
  email:String,
  password:String
})

const User=mongoose.model(collectionName,userSchema,collectionName)

exports.insertUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri, { dbName: dbname })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then(user => {
        if (user) {
          mongoose.disconnect();
          reject("User already exists");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then(hashedPassword => {
        const user = new User({ name, email, password: hashedPassword });
        return user.save();
      })
      .then(savedUser => {
        mongoose.disconnect();
        resolve(savedUser);
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};





exports.loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri, { dbName: dbname })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then(user => {
        if (user) {
          return bcrypt.compare(password, user.password).then(result => {
            if (result) {
              resolve(user._id);
            } else {
              throw new Error("Wrong password");
            }
          });
        } else {
          throw new Error("User not found");
        }
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};