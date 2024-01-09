// Add a POST route to handle password change
app.post('/change-password', async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        // Retrieve the user from the database
        const currentUser = await user.findById(req.session.userId);

        // Check if the current password matches the one stored in the database
        if (currentUser && await currentUser.comparePassword(currentPassword)) {
            // Check if the new passwords match
            if (newPassword === confirmPassword) {
                // Update the password if the current password is correct and new passwords match
                currentUser.password = newPassword;
                await currentUser.save();

                // Redirect to the profile page or any other appropriate page
                res.redirect('/profilepage');
            } else {
                // New passwords don't match, handle accordingly
                res.render('dashboard/change-password', { error: 'New passwords do not match' });
            }
        } else {
            // Incorrect current password, handle accordingly
            res.render('dashboard/change-password', { error: 'Incorrect current password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
