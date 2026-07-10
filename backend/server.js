require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const { errorHandler } = require("./src/middlewares/errorMiddleware");

const app = express();

// Connect to Database
connectDB();

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// Body parser & Cookie parser Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", userRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});