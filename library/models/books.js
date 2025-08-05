const mongoose = require('mongoose');

const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];

const dbname = 'library';
const collectionName = 'books';
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.3cmm2.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`




const schemaBooks=mongoose.Schema({
  title:String,
  description:String,
  author:String,
  price:Number,
  image:String,
  userId:String
})



const Books = mongoose.model(collectionName, schemaBooks, collectionName);


exports.getAllBooks=()=>{
    return new Promise((resolve,reject)=>{

     mongoose.connect(uri, { dbName: dbname })
       .then(()=>{
         return Books.find({})

       })
       .then(books=>{
           mongoose.disconnect()
           resolve(books)

       })
       .catch(err=>reject(err))

    })
}


exports.getthreeBooks=()=>{
    return new Promise((resolve,reject)=>{

     mongoose.connect(uri, { dbName: dbname })
       .then(()=>{
         return Books.find({}).limit(3)

       })
       .then(books=>{
           mongoose.disconnect()
           resolve(books)

       })
       .catch(err=>reject(err))

    })
}


exports.findOneByID=(id)=>{
    return new Promise((resolve,reject)=>{

     mongoose.connect(uri, { dbName: dbname })
       .then(()=>{
         return Books.findById(id)

       })
       .then(books=>{
           mongoose.disconnect()
           resolve(books)

       })
       .catch(err=>reject(err))

    })
}

exports.addbook = (title, author, description, price, image, userId) => {
  const book = new Books({
    title: title,
    author: author,
    description: description,
    price: price,
    image: image,
    userId: userId
  });

  return new Promise((resolve, reject) => {
    mongoose.connect(uri, { dbName: dbname })
      .then(() => {
        return book.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve('added' );
      })
      .catch((err) => {
        mongoose.disconnect();
        console.log(err);
        reject(err);
      });
  });
};

exports.getMybooks=(userId)=>{
    return new Promise((resolve,reject)=>{

     mongoose.connect(uri, { dbName: dbname })
       .then(()=>{
         return Books.find({userId:userId})

       })
       .then(books=>{
           mongoose.disconnect()
           resolve(books)

       })
       .catch(err=>reject(err) )

    })
}


exports.deleteBook=(id)=>{
    return new Promise((resolve,reject)=>{

     mongoose.connect(uri, { dbName: dbname })
       .then(()=>{
         return Books.deleteOne({_id :id})

       })
       .then(books=>{
           mongoose.disconnect()
           resolve(books)

       })
       .catch(err=>reject(err))

    })
}
exports.postUpdateBookModel=(bookId,title,description,author,price,filename,userId)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

         return Books.updateOne({_id:bookId},{title:title,description:description,author:author,image:filename,price:price,userId:userId})


        }).then(()=>{
            mongoose.disconnect()
            resolve('Updated!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })

} 