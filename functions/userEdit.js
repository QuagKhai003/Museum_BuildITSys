// controllers/userController.js
const express = require('express');
const bcrypt = require('bcrypt'); // Assuming you have bcrypt installed
const user = require('../models/user');
const userController = {};

userController.getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await user.findById(id);
        if (!foundUser) {
            res.status(500).json({ error: "User not found" });
        }
        if (foundUser.role == "visitor") {
            res.render('dashboard/profileVisitor', { user: foundUser });
        } if (foundUser.role == "artist") {
            res.render('dashboard/profileArtist', { user: foundUser });
        }
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
};

userController.getEditProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await user.findById(id);
        if (foundUser.role == "visitor") {
            res.render('dashboard/edit', { user: foundUser });
        } else if (foundUser.role == "artist") {
            res.render('dashboard/editArtist', { user: foundUser });
        } else {
            res.status(500).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

userController.postEditProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await user.findById(id);
        if (!foundUser) {
            res.status(500).json({ error: "User not found" });
        }

        // Update the user's profile based on the form data
        foundUser.username = req.body.username;
        foundUser.email = req.body.email;

        if (req.file) {
            foundUser.avatar = req.file.filename;
        }

        // Save the updated user profile
        await foundUser.save();

        res.redirect(`/profile/${foundUser._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

userController.getChangePassword = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await user.findById(id);

        if (!foundUser) {
            res.status(500).json({ error: "User not found" });
        }

        if (foundUser.role == "visitor") {
            res.render('dashboard/password', { user: foundUser });
        } else {
            res.render('dashboard/passwordArtist', { user: foundUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

userController.postChangePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    try {
        const foundUser = await user.findById(id);

        if (!foundUser) {
            res.status(500).json({ error: "User not found" });
        }

        // Compare the current encrypted password with the input
        const isPasswordMatch = await bcrypt.compare(currentPassword, foundUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }

        // Check if the new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: "New password and confirm password do not match" });
        }

        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        foundUser.password = hashedPassword;

        // Save the updated user
        await foundUser.save();

        res.redirect(`/profile/${foundUser._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {userController};
