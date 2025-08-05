const bookModel = require('../models/books');


exports.detailsPageController=(req,res,next)=>{
  const id =req.params.id
  bookModel.findOneByID(id).then(book=>{
    res.render('details',{book:book,verifUser:req.session.userId})
  })
}