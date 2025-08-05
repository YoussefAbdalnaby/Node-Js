const detailsPageController=require("../controllers/detailsPageController")
const route=require('express').Router()
const guardAuth = require('../controllers/guardAuth');


route.get("/details/:id",guardAuth.isAuth,detailsPageController.detailsPageController)


module.exports=route