const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");

const sendTokenResponse = (result, res, statusCode) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    res.cookie("accessToken", result.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 
    });

    res.cookie("refreshToken", result.refreshToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(statusCode).json({
        success: true,
        user: result.user
    });
};

exports.signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const result = await userService.createUser({ name, email, password });
    
    if (!result.success) {
        return res.status(400).json({ success: false, message: result.message });
    }
    return res.status(201).json({
        success: true,
        message: "User registered successfully. Please sign in.",
        user: result.user
    });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    
    if (!result.success) {
        return res.status(401).json({ success: false, message: result.message });
    }
    
    return sendTokenResponse(result, res, 200);
});

exports.refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await userService.refreshUserToken(refreshToken);
    
    if (!result.success) {
        return res.status(401).json({ success: false, message: result.message });
    }
    
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    
    res.cookie("accessToken", result.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 
    });

    return res.status(200).json({ success: true, message: "Token refreshed" });
});

exports.logout = asyncHandler(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({ success: true, message: "Logged out successfully" });
});