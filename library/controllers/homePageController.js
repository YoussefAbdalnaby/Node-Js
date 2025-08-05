const bookModel = require('../models/books');



exports.homePageController = (req, res, next) => {
  bookModel.getthreeBooks().then(books => {
    res.render("index", { books: books ,verifUser:req.session.userId});
  });
};
