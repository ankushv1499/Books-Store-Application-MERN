const { timeStamp } = require("console");
const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for Delivered", "Canceled"],
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("Order", order)