const { log } = require("console");
require('dotenv').config();
const express = require("express");
const app = express();
const  connectDB  = require ("./connection/db")
const User = require("./routes/user.route");
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")

// app.get('/' , (req, res) =>{
//     res.send('Hello from backend')
// })
connectDB();

app.use(express.json());
//routes
app.use("/api/v1/",User); 
app.use("/api/v1/",Books); 
app.use("/api/v1/",Favourite); 

// creating port
app.listen(process.env.PORT, () => {
    console.log(`Server stated at port ${process.env.PORT}`);
    
});