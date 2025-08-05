const userModel = require("../models/users");

exports.registerController = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;  

    userModel.insertUser(username, email, password)
        .then((user) => {
            res.status(200).json({ user: user });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message }); // Update to send the error message
        });
};