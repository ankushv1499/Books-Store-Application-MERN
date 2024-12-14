require('dotenv').config();
const { log } = require("console");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const  connectDB  = require ("./connection/conn")
const User = require("./routes/user.route");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite")
const Order = require("./routes/order");
const Cart = require("./routes/cart");

app.use(express.json());
//routes
app.use("/api/v1/",User); 
app.use("/api/v1/",Books); 
app.use("/api/v1/",Favourite); 
app.use("/api/v1/",Cart); 
app.use("/api/v1/",Order); 


// creating port
app.listen(process.env.PORT, () => {
    console.log(`Server stated at port ${process.env.PORT}`);
    
});