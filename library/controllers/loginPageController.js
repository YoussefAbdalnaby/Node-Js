const authModel=require( '../models/auth' )
exports.getLoginPage=(req,res)=>{
  res.render('login',{verifUser:req.session.userId,
                     loginErr:req.flash("loginErr")[0]})
}


exports.postLoginPage=(req,res)=>{
const email=req.body.email
const password=req.body.password
  authModel.loginUser(email,password)
    .then(id=>{
      req.session.userId=id
      console.log("LOggged")
      console.log(req.session.userId)
      res.redirect("/")
    })
    .catch(err => {
      console.error(err);
      req.flash("loginErr",err.toString())

      res.redirect("/login");
    });
  }
exports.logoutFunction=(req,res)=>{
req.session.destroy(()=>{
   res.clearCookie('connect.sid'); 
  console.log("logged out")
  res.redirect('/login')
} )

  
}

