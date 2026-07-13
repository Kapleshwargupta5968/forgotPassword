const userRepository = require("../repositories/user.repository");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

/**
 * Creates a new user in the database.
 * 
 * @param {Object} data - The user data to create.
 * @returns {Promise<{success: boolean, user?: Object, accessToken?: string, refreshToken?: string, message?: string}>} The result of the operation.
 */
exports.createUser = async (data) => {
    try {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("User data is required");
        }

        const user = await userRepository.createUser(data);
        
        const payload = { userId: user._id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        
        return { 
            success: true, 
            user: user,
            accessToken,
            refreshToken
        };
    } catch (error) {    
        return {
            success: false,
            message: error.message || "An unexpected error occurred while creating the user."
        };
    }
};

exports.loginUser = async (data) => {
    try{
        if(!data || Object.keys(data).length === 0){
            throw new Error("Data is required")
        }
        const user = await userRepository.findUserByEmail(data.email);
        if(!user){
            return {
                success: false,
                message: "User not found"
            }
        }
        if(!user.comparePassword(data.password)){
            return {
                success: false,
                message: "Invalid credentials"
            }
        }
        
        const payload = { userId: user._id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return {
            success: true,
            user: user,
            accessToken,
            refreshToken
        }

    }catch(error){
        return {
            success: false,
            message: error.message || "An unexpected error occurred while logging in."
        };
    }
}

exports.refreshUserToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            return { success: false, message: "No refresh token provided" };
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        
        const user = await userRepository.findUserById(decoded.userId);
        
        if (!user) {
            return { success: false, message: "User no longer exists" };
        }
        const payload = { userId: decoded.userId };
        const newAccessToken = generateAccessToken(payload);
        
        return {
            success: true,
            accessToken: newAccessToken
        };
    } catch (error) {
        return {
            success: false,
            message: "Invalid or expired refresh token"
        };
    }
};

exports.forgotPassword = async (email) => {
    try {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            return { success: true, message: "If an account with that email exists, we have sent a reset link." };
        }

        // Generate a random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash token before saving to db
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Set expiration to 15 minutes
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Create reset URL pointing to frontend
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Token",
                message,
            });
            return { success: true, message: "If an account with that email exists, we have sent a reset link." };
        } catch (error) {
            console.error("Email could not be sent", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return { success: false, message: "Email could not be sent" };
        }
    } catch (error) {
        return { success: false, message: error.message || "An error occurred" };
    }
};

exports.resetPassword = async (token, newPassword) => {
    try {
        // Hash token to compare with DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await userRepository.findUserByResetToken(hashedToken);

        if (!user) {
            return { success: false, message: "Invalid or expired token" };
        }

        // Set the new password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return { success: true, message: "Password updated successfully" };
    } catch (error) {
        return { success: false, message: error.message || "An error occurred" };
    }
};