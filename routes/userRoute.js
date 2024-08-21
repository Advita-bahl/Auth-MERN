const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModels.js");

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({
            name,
            email,
            age,
        });

        res.status(201).json(userAdded);  // Correct usage
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });  // Correct usage
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);  // Correct usage
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });  // Correct usage
    }
});

// Get single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ error: "User not found" });  // Handle case where user is not found
        }
        res.status(200).json(singleUser);  // Correct usage
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });  // Correct usage
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id);
        if (!singleUser) {
            return res.status(404).json({ error: "User not found" });  // Handle case where user is not found
        }
        res.status(200).json(singleUser);  // Correct usage
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });  // Correct usage
    }
});

// Update user
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updateUser) {
            return res.status(404).json({ error: "User not found" });  // Handle case where user is not found
        }
        res.status(200).json(updateUser);  // Correct usage
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });  // Correct usage
    }
});

module.exports = router;


