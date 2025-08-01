// Load environment variables first, before any other imports
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

export default {};
