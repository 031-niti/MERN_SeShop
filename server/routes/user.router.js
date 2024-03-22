const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// get
router.get("/", async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "failed to Get All User" });
    }
});

// get by id
router.get('/:id', async (req, res) => {
    try {
        const users = await UserModel.findById(req.params.id);
        res.json(users);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("User not found!")
        } else {
            res.status(500).json({ error: "Failed to get User data!" });
        }
    }
});

// post
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(302).json({ message: "User already exists" });
        }
        if (!req.body.photoURL) {
            req.body.photoURL =
                "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        }
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create User" });
    }
});

// put
router.put('/:id', async (req, res) => {
    try {
        const users = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(users);
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("User not found!")
        } else {
            res.status(500).json({ error: "Failed to Update User data!" });
        }
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const users = await UserModel.findByIdAndDelete(req.params.id);
        if (users) {
            res.status(200).json({ message: "User ID " + req.params.id + " is Delete Successfully" });
        }
    } catch (error) {
        if (error.kind === "not_found!") {
            res.status(400).json("User not found!")
        } else {
            res.status(500).json({ error: "Failed to Delete User data!" });
        }
    }
});

// check if a user is an admin
router.get("/admin/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UserModel.findOne({ email })
        let isAdmin = false;
        if (user.role === "admin") {
            isAdmin = true;
        }
        res.json({ isAdmin });
    } catch (error) {
        res.status(500).json({ error });
    }
})

// Change Admin to User Role
router.patch("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                role: "user",
            }, {
            new: true,
            runValidators: true,
        }
        );
        if (!updatedUser) {
            res.status(404).json("User not found!")
        }
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ error });
    }
})

// Change User to Admin Role
router.patch("/admin/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                role: "admin",
            }, {
            new: true,
            runValidators: true,
        }
        );
        if (!updatedUser) {
            res.status(404).json("User not found!")
        }
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;