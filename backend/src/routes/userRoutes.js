const express = require("express");
const { signUp, login, refresh } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
