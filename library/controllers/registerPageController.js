const userModel = require('../models/auth');

exports.getRegisterPage = (req, res) => {
  res.render('register',{verifUser:req.session.userId,
                         registerErr:req.flash('RegisterErr')[0]});
};

exports.postRegisterPageController = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

   userModel.insertUser(name, email, password)
      .then((user) => res.redirect('/register/thank') )
      .catch(err => {
        console.error(err);
        req.flash("RegisterErr",err.toString())
        res.redirect('/register');
      });
  };
exports.showThankYouPage = (req, res) => {
  res.render('thank',{verifUser:req.session.userId});
}

