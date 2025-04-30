const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/database");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Call the function

app.use("/api/auth", authRoutes);

// Catch-all route for invalid routes
// app.use((req, res) => {
// 	res.status(404).json({ message: 'Not Found' });
// });

app.listen(5000, () => console.log("Server running on port 5000"));
