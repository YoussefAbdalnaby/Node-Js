const homePageController = require('../controllers/homePageController');
const route=require('express').Router()
const guardAuth = require('../controllers/guardAuth');


route.get('/',guardAuth.isAuth,homePageController.homePageController)


module.exports=route