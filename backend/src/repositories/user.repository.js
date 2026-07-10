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
    return await User.findOne({ where: { email } });
};
