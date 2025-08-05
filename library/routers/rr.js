const registerPageController = require('../controllers/registerPageController');
const bodyParser = require("body-parser");
const route = require('express').Router();



route.post('/thank', bodyParser.urlencoded({ extended: true }),registerPageController.postRegisterPageController);



module.exports = route;