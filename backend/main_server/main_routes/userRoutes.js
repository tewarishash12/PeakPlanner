const router = require("express").Router();

const { me } = require("../main_controllers/userControllers");
const { authLogin } = require("../middlewares/authMiddleware");

router.get("/me", authLogin, me);

module.exports = router