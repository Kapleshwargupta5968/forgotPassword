const User = require("../models/user");

/**
 * Creates a new user in the database.
 * 
 * @param {Object} data - The user data to create.
 * @returns {Promise<Object>} The created user.
 */
exports.createUser = async (data) => {
    return await User.create(data);
};

/**
 * Finds a user by their email address.
 * 
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} The user if found, or null.
 */
exports.findUserByEmail = async (email) => {
    // Fixed syntax for Mongoose (removed the 'where' wrapper)
    return await User.findOne({ email });
};

/**
 * Finds a user by their ID.
 * 
 * @param {string} id - The user ID to search for.
 * @returns {Promise<Object|null>} The user if found, or null.
 */
exports.findUserById = async (id) => {
    return await User.findById(id);
};

/**
 * Finds a user by their reset password token if it hasn't expired.
 * 
 * @param {string} token - The hashed reset password token.
 * @returns {Promise<Object|null>} The user if found, or null.
 */
exports.findUserByResetToken = async (token) => {
    return await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
};
