const bcrypt = require('bcrypt');
const User = require('../models/user')

async function changePw(req, res) {
    try {
        const foundUser = await User.findOne({ _id: req.session.user.id });
        if (foundUser) {
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const confirmPassword = req.body.confirmPassword;

            // Check if the current password is the same as in the database
            const match = await bcrypt.compare(currentPassword, foundUser.password);
            if (!match) {
                return res.status(400).send('Current password is incorrect');
            }
            // Check if the new password and confirm password match
            if (newPassword !== confirmPassword) {
                return res.status(400).send('New password and confirm password do not match');
            }

            // Hash the new password and save it
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            foundUser.password = hashedPassword;
            await foundUser.save();

            // Destroy the session and go back to login page
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Server error');
                }
                res.status(200).redirect('/login');
            });

        } else {
            res.status(404).redirect('/error');
        }
    } catch (err) {
        console.log(err);
        res.status(500).redirect('/error');
    }
}

module.exports = { changePw }
