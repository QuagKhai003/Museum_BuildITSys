const bcrypt = require('bcrypt'); // Assuming you have bcrypt installed
const user = require('../models/user');

const getProfile = async (req, res) => {
    try {
        if(!req.session.user) {
            res.status(401).redirect('/login')
        } else {
            const foundUser = await user.findById(req.session.user.id);
            if (!foundUser) {
                res.status(400).redirect('/error')
            } else {
                res.render('dashboard/profile', { foundUser: foundUser, user: req.session.user });
            }
        }
    } catch (error) {
        console.error("Error while retrieve user", error);
        res.send(error.message);
    }
};

const getEditProfile = async (req, res) => {
    try {
        const foundUser = await user.findById(req.session.user.id)
        if (!foundUser) {
            res.status(400).redirect('/login')
        } if( foundUser ) {
            res.render('dashboard/edit', { foundUser: foundUser, user: req.session.user });
        }
    } catch (error) {
        console.error("Error while get edit page", error);
        res.status(500).redirect("/error");
    }
};

const postEditProfile = async (req, res) => {
    try {
        const foundUser = await user.findById(req.session.user.id);

        if (!foundUser) {
            res.status(400).redirect('/login')
        } else {
            foundUser.username = req.body.username;
            foundUser.email = req.body.email;

            if (req.file) {
                foundUser.avatar = req.file.filename;
            }
            await foundUser.save();
        }

        res.status(200).redirect('/profile');
    } catch (error) {
        console.error("Error while edit user info", error);
        res.status(500).redirect('/error');
    }
};

const getChangePassword = async (req, res) => {
    try {
        const foundUser = await user.findById(req.session.user.id);

        if (!foundUser) {
            res.status(400).redirect('/login')
        } else {
            res.render('dashboard/password', { foundUser: foundUser, user: req.session.user });
        }

    } catch (error) {
        console.error("Error while retrieving password page", error);
        res.status(500).redirect('/error')
    }
};

const postChangePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    try {
        const foundUser = await user.findById(req.session.user.id);

        if (!foundUser) {
            res.status(400).redirect('/login')
        } else {
            // Compare the current encrypted password with the input
            const isPasswordMatch = await bcrypt.compare(currentPassword, foundUser.password);

            if (!isPasswordMatch) {
                return res.status(401).json({ error: "Current password is incorrect" });
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

            res.status(200).redirect('/profile');
        }      
    } catch (error) {
        console.error("Error while changing password", error);
        res.status(500).redirect('/error');
    }
};

module.exports = {
    getProfile,
    getEditProfile,
    postEditProfile,
    getChangePassword,
    postChangePassword
};
