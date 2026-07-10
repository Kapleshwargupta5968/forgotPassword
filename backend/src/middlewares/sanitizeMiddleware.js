const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");

// Recursive function to sanitize objects against XSS
const sanitizeXSS = (obj) => {
    if (typeof obj === 'string') {
        return xss(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeXSS(item));
    }
    if (obj !== null && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            obj[key] = sanitizeXSS(obj[key]);
        });
    }
    return obj;
};

exports.sanitizeData = (req, res, next) => {
    // 1. Sanitize against NoSQL injection (in-place modification avoids getter crash)
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.params) mongoSanitize.sanitize(req.params);
    if (req.query) {
        // We can safely sanitize the contents of req.query without reassigning it
        mongoSanitize.sanitize(req.query);
    }

    // 2. Sanitize against XSS
    if (req.body) req.body = sanitizeXSS(req.body);
    if (req.params) req.params = sanitizeXSS(req.params);
    
    next();
};
