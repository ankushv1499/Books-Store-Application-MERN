const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./userAuth");


// Sign-Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        //check username length more than 3
        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username should be more than 3" });

        }
         // Validate required fields
         if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check username already exit ?
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "username is already exist" })

        }
        //check email already exit ?
        const existingEmail = await User.findOne({ email: email });
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

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign-up successfully" })

    } catch (error) {
        console.error("Error in Sign-Up route:", error);
        res.status(500).json({ message: "Internal server error" })
    }
});

// sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        // Check if the user exists in the database
        if (!existingUser) {
            res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare provided password with hashed password
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

/*
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists in the database
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const authClaims = {
            id: existingUser._id,
            username: existingUser.username,
            role: existingUser.role,
        };
        const token = jwt.sign(authClaims, "bookStore123", { expiresIn: "30d" });

        // Return success response with token
        res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
        });
    } catch (error) {
        console.error("Error during sign-in:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});
*/


// get user-information
router.get("/get-user-information", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const data = await User.findById(id).select("-password");

        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching user information:", error); // Debugging
        res.status(500).json({ message: "Internal server error" });
    }
});

//update address
router.put("/update-address", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address Update Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
});


module.exports = router;