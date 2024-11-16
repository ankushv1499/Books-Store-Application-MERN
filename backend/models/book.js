const mongoose = require ("mongoose");

const book = new mongoose.Schema({
    url:{

    },
   title:{
    required: ture,
   },
   author: {
    type: String,
    required: true,
   },
   price: {
    type: Number,
    required: true,
   },
   desc: {
    type: String,
    required: true,
   },
   language: {
    type:String,
    required: true
   }

},
{timeStamp: true}
);

module.exports = mongoose.Model("books" , book)