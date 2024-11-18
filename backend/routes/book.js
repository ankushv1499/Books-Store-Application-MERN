const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticationToken } = require("./userAuth");
const { title } = require("process");


//add-books --admin
router.post("/add-book", authenticationToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin") 
        {
            return res.status(400).json({ message: "Ypu not having access of admin" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            decs: req.body.decs,
            language: req.body.language
        });
        await book.save();
        res.status(200).json({message: "Book added successfully"})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

});

// //updateBook
// router.put("/update-book", authenticationToken, async (req, res)=>{
//     try {
//         const {bookid} = req.headers;
//         await Book.findByIdAndUpdate(bookid, {
        
//             url: req.body.url,
//             title: req.body.title,
//             author: req.body.author,
//             price: req.body.price,
//             decs: req.body.decs,
//             language: req.body.language
//         });
//         return res.status(200)
//         .json({message: "Book update  successfully"})
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }

// })

module.exports = router;