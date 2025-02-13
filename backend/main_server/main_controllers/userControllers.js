const User = require("../main_models/user");

exports.me = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}