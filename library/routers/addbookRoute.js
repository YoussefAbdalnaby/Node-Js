const addbookPageController = require('../controllers/addbookPageController');
const guardAuth = require('../controllers/guardAuth');
const route=require('express').Router()
const bodyParser=require("body-parser").urlencoded({extended:true});
const multer = require('multer'); 

route.get('/addBook',guardAuth.isAuth,addbookPageController.getAddBookPage)
route.post('/addBook',guardAuth.isAuth,
           multer({
           storage:multer.diskStorage({
               destination:function (req, file, cb) {
                       cb(null, 'assets/images')  
                 },
               filename:function (req, file, cb) {
                       cb(null, Date.now()+'-'+ file.originalname )      
               }
           })
           }).single('image'),addbookPageController.PostAddBookPage)

module.exports=route