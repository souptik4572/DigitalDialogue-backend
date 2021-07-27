const mongoose = require('mongoose');
const { SUPER_ADMIN, ADMIN, READER } = require('../constants/userTypes');

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

const User = mongoose.model('User', UserSchema);

module.exports = User;
