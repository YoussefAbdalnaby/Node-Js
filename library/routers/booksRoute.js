const booksPagecontroller = require('../controllers/booksPagecontroller');
const guardAuth = require('../controllers/guardAuth');
const route=require('express').Router()

route.get('/books',guardAuth.isAuth,booksPagecontroller.booksPagecontroller)


module.exports=route