const mongoose = require('mongoose');
const { READER } = require('../constants/userTypes');

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
		default: READER,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
