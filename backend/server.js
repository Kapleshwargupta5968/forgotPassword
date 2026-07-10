require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const { errorHandler } = require("./src/middlewares/errorMiddleware");

const { sanitizeData } = require("./src/middlewares/sanitizeMiddleware");

const app = express();

// Connect to Database
connectDB();

// Body parser & Cookie parser Middlewares
app.use(express.json());
app.use(cookieParser());

// Security Middlewares
app.use(helmet());
app.use(sanitizeData);

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// Routes
app.use("/api/auth", userRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});