const bookModel = require('../models/books');


exports.booksPagecontroller = (req, res, next) => {
  bookModel.getAllBooks().then(books => {
    res.render("books", { books: books ,verifUser:req.session.userId});
  });
};
