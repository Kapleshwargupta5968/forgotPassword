const express = require("express");
const { signUp, login, refresh, logout, forgotPassword, resetPassword } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
