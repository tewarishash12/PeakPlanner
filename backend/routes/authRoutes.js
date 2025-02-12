const router = require("express").Router();

const { register, login, logout, token } = require("../controllers/authControllers");

router.post("/register", register)

router.post("/login", login)

router.post("/token", token)

router.post("/logout", logout)

module.exports = router;