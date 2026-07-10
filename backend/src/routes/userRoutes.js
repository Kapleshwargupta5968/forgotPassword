const express = require("express");
const { signUp, login, refresh, logout } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
