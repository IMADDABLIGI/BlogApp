const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/database");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/articles", async (req, res)=>{
    const articles = [
        {
            id: 1,
            name: "John Doe",
            role: "CEO at TechCorp",
            pic: "/api/placeholder/48/48",  


            date: "April 28, 2025", }]
        
        return res.json(articles);
        
        })
// Catch-all route for invalid routes
// app.use((req, res) => {
// 	res.status(404).json({ message: 'Not Found' });
// });

app.listen(5000, () => console.log("Server running on port 5000"));
