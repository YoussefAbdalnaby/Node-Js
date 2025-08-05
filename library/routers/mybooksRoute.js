const mybooksController = require('../controllers/mybooksController');

const multer = require('multer'); 
const guardAuth = require('../controllers/guardAuth');

const route = require('express').Router();
const bodyParser=require("body-parser").urlencoded({extended:true});


route.get('/mybooks', guardAuth.isAuth, mybooksController.getMyBooks);



route.post('/mybooks/delete/:id',guardAuth.isAuth, mybooksController.deleteBook)

route.get('/mybooks/update/:id',guardAuth.isAuth, mybooksController.getMybookUpdatePage)

route.post('/mybooks/updatebook/:id',bodyParser, multer({
  storage:multer.diskStorage({
      destination:function (req, file, cb) {  
        cb(null, 'images/uploads')          
        },
      filename:function (req, file, cb) { 
              cb(null, Date.now()+'-'+ file.originalname )  
      }
  })
  }).single('image'),guardAuth.isAuth,mybooksController.postUpdateBookContoller)


module.exports=route