/**
 * A wrapper for async route handlers to automatically catch errors and pass them to Express's next().
 * This eliminates the need for try/catch blocks in every controller function.
 * 
 * @param {Function} requestHandler - The asynchronous Express route handler function.
 * @returns {Function} Express middleware function
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

module.exports = asyncHandler;