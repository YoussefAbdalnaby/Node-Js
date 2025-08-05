const bookModel=require( '../models/books')

exports.getAddBookPage = (req, res) =>{
	res.render('addBook',{verifUser:req.session.userId,
                        donemsg:req.flash("donemsg")[0],
                       errmsg:req.flash("errmsg")[0]});

}
exports.PostAddBookPage = (req, res) =>{
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.file.filename;
  const userId = req.session.userId;;
  
  bookModel.addbook(title, author, description, price, image, userId).then((msg)=>{
    
req.flash('donemsg',msg.toString())
    console.log("adddd")
    res.redirect('/addBook')

    
  }).catch((err)=>{
    req.flash('errmsg',err.toString())
    res.redirect('/addBook')

  })

}
