//imports
const express=require('express')
const app=express()
const path= require('path')
var jwt = require('jsonwebtoken');


const homeRoute=require('./routers/homeRoute')
const booksRoute=require('./routers/booksRoute')
const detailsRoute=require('./routers/detailsRoute')
const registerRoute=require('./routers/registerRoute')
const loginRoute=require('./routers/loginRoute')
const addbookRoute=require('./routers/addbookRoute')
const mybooksRoute=require('./routers/mybooksRoute')
const apiRoute=require('./routers/apiRoute')
const bodyParser = require("body-parser");
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
var flash = require('connect-flash');


//DB
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const dbname = process.env['MONGO_DBNAME']
const url=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.3cmm2.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`
//sessions
var Store=new MongoDbStore({
    uri:url,
    collection:'sessions'
}) 
app.use(session({
    secret:'this is my secret key youssef',
    store:Store,
    resave: true,
    saveUninitialized: false,
  cookie: {
    maxAge: 18000// 1 week
  }
}))
// uses
app.use(express.static('assets'))
app.set('view engine','ejs')
app.set('views','views')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(bodyParser.json());

//routes
app.get("/",homeRoute)
app.get("/books",booksRoute)
app.get("/details/:id",detailsRoute)
app.use("/",registerRoute)
app.use("/",loginRoute)
app.use("/",addbookRoute)
app.use("/",mybooksRoute)
app.use("/",apiRoute)

app.listen(3000,()=>{
  console.log("RUNNING ON PORT 3000")
})

