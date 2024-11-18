const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticationToken } = require("./userAuth");
const { title } = require("process");


//add-books --admin
router.post("/add-book", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
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
        res.status(200).json({ message: "Book added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

});
//updateBook
router.put("/update-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {

            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            decs: req.body.decs,
            language: req.body.language
        });
        return res.status(200)
            .json({ message: "Book update  successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

});

// deleteBook--admin

router.delete("/delete-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "book deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });

    }
});

//get-all books

router.get("get-all-books" ,authenticationToken, async (req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occured" });
    }
});

//get recently added 4 books
router.get("get-recent-books" ,authenticationToken, async (req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occured" });
    }
});
module.exports = router;