const router = require("express").Router();
const { Module } = require("module");
const User = require("../models/user");
const { authenticationToken } = require("./userAuth");

// add book to favourites
router.put("/add-book-to-favourite", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }
        await User.findByIdAndDelete(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book is addded to favourites" })


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

// add removed from favourites
router.delete("/remove-book-from-favourite", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndDelete(id, { $pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "Book removed from favourites" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

//get favourite books of a particular user
router.get("/get-favourite-books", authenticationToken, async(req, res) =>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate(favourites);
        const favouriteBook = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBook,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;