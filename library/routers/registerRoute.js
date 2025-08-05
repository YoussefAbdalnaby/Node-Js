const express = require('express');
const registerPageController = require('../controllers/registerPageController');
const route = express.Router();
const bodyParser = require("body-parser");



route.get('/register', registerPageController.getRegisterPage);

  route.post('/register', bodyParser.urlencoded({ extended: true }),registerPageController.postRegisterPageController);

route.get('/register/thank', registerPageController.showThankYouPage); // Updated route
module.exports=route