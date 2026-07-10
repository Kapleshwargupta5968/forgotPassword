const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
