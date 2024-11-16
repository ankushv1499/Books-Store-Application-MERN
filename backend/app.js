const { log } = require("console");
const express = require("express");

const app = express();
require("dotenv").config();
require("./connection/conn");

// app.get('/' , (req, res) =>{
//     res.send('Hello from backend')
// })

// creating port
app.listen(process.env.PORT, () => {
    console.log(`Server stated at port ${process.env.PORT}`);
    
});