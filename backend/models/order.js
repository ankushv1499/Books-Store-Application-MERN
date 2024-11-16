const { timeStamp } = require("console");
const mongoose = require ("mongoose");

const order = new mongoose.Schema({
    user:  {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    
    book:  {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status:  {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed","Out for Delivered, Canceled"],
    },

},
{timeStamp: true}
);

module.exports = mongoose.Model("order" , order)