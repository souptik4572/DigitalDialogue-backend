// Load environment variables first
import "./env-config.js";
import mongoose from "mongoose";

const DATABASE_URL =
	process.env.DATABASE_URL || "mongodb://localhost:27017/Digital-Dialogue";

const configureMongoose = async () => {
	try {
		await mongoose.connect(DATABASE_URL);
		console.log("Successfully connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

export default configureMongoose;
