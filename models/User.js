import mongoose from "mongoose";
import { SUPER_ADMIN, ADMIN, READER } from "../constants/userTypes.js";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		enum: [SUPER_ADMIN, ADMIN, READER],
		default: READER,
	},
});

const User = mongoose.model("User", UserSchema);

export default User;
