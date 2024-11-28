const { log } = require("console");
require('dotenv').config();
const express = require("express");
const app = express();
const  connectDB  = require ("./connection/db")

// app.get('/' , (req, res) =>{
//     res.send('Hello from backend')
// })
connectDB();

app.use(express.json());
//routes
app.use("/api/v1/sign-up",user); 

// creating port
app.listen(process.env.PORT, () => {
    console.log(`Server stated at port ${process.env.PORT}`);
    
});