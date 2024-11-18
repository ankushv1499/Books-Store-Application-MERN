const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./userAuth");
const user = require("../models/user");

// Sign-Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, addresss } = req.body;

        //check username length more than 3
        if (username.length < 4) {
            return res
                .status
                .json({ message: "Username should be more than 3" });

        }
        //check username already exit ?
        const existingUsername = await user.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "username is already exist" })

        }
        //check email already exit ?
        const existingEmail = await user.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "email is already exist" })

        }
        //check password length more than 5
        if (password.length <= 5) {
            return res
                .status(400)
                .json({ message: "Password's length should be greater than 5" })

        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new user({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign-up successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
});

// sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: "Invalid credentials" });
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existingUser.username },
                    { role: existingUser.role },
                ]
                const token = jwt.sign({ authClaims }, "bookStore123", {
                    expiresIn: "30d",
                });
                res.status(200).json({
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token
                })
            }
            else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
});

// get user-information
router.get("/get-user-information", authenticationToken, async (res, req) => {
    try {
        const { id } = req.headers;
        const data = await user.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

//update address
router.put("/update-address", authenticationToken, async (res, req) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await user.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address Update Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
});


module.exports = router;