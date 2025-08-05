const route=require('express').Router()
const guardAuth = require('../controllers/guardAuth');

const loginPageController=require('../controllers/loginPageController')

const bodyParser=require("body-parser").urlencoded({extended:true});
route.get("/login",guardAuth.isNotAuth,loginPageController.getLoginPage)

route.post("/login",guardAuth.isNotAuth,bodyParser,loginPageController.postLoginPage)


route.post("/logout",bodyParser,loginPageController.logoutFunction)
module.exports=route