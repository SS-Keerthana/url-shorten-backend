const jwt = require('jsonwebtoken');

const googleCallback = (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.json({ token, user: req.user });
};

module.exports = {
    googleCallback,
};
