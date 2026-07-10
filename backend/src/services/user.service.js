const userRepository = require("../repositories/user.repository");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

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