const bookModel = require('../models/books');

exports.getMyBooks = (req, res) =>{
  const userid=req.session.userId
bookModel.getMybooks(userid).then((books)=>{
  res.render("mybooks",{books:books,verifUser:req.session.userId,
                          deleted:req.flash("deleted")[0],
                            failed:req.flash("failed")[0]})
}

  )}

exports.deleteBook =(req,res)=>{
const id =req.params.id
  bookModel.deleteBook(id).then(()=>{

req.flash('deleted',"Book deleted successfully")    
res.redirect('/mybooks')
}).catch(err=>{
req.flash('failed',"Book not deleted")    
res.redirect('/mybooks')
})
  }




exports.getMybookUpdatePage=(req,res,next)=>{
    let id=req.params.id
    bookModel.findOneByID(id).then((book)=>{
        console.log(book)
        res.render('update',{book:book,verifUser:req.session.userId,Smessage:req.flash('Smessage')[0],Emessage:req.flash('Emessage')[0]})
    })
}



exports.postUpdateBookContoller=(req,res,next)=>{
  
        if(req.file){
            bookModel.postUpdateBookModel(req.params.id,req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userId).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/mybooks/update/${req.params.id}`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/mybooks/update/${req.params.id}`)
            })
        }else{
            bookModel.postUpdateBookModel(req.params.id,req.body.title,req.body.description,req.body.author,req.body.price,req.body.oldImage,req.session.userId).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/mybooks/update/${req.params.id}`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/mybooks/update/${req.params.id}`)
            })
        }





}


