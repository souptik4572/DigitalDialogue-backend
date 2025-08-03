// Load environment variables FIRST
import "./config/env-config.js";

import express from "express";
import cors from "cors";
import configureMongoose from "./config/mongoose-config.js";
import authenticationRoutes from "./routes/authentication.js";
import userRoutes from "./routes/users.js";
import blogRoutes from "./routes/blogs.js";
import commentRoutes from "./routes/comments.js";
import dotenv from 'dotenv';

// All of our user defined middlewares
import { authProtection, isSuperAdmin } from "./middlewares/authStrategy.js";

// Load environment variables
dotenv.config();

// Configuring our Mongo database with mongoose
configureMongoose();

// Defining our express app
const app = express();

// Our cross origin resource sharing middleware
app.use(cors());

// Our body-parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Our middleware for serving static files
app.use(express.static("public"));

// All of our authentication routes
app.use("/api/auth", authenticationRoutes);
// All of our user routes
app.use("/api/users", [authProtection, isSuperAdmin], userRoutes);
// All of our blog routes
app.use("/api/blogs", blogRoutes);
// All of our comment routes
app.use("/api/blogs/:blogId/comments", commentRoutes);

// Our initial index static file
app.get("/", (req, res) => {
	res.sendFile("index.html");
});

// Initialising our dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server up and running at http://localhost:${PORT}`);
});
