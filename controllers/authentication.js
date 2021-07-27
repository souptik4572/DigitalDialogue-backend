const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerNewUser = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		return res.status(404).json({
			success: false,
			error: 'Email already exists',
		});
	}
	const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
	const hashedPassword = await bcrypt.hash(password, salt);
	try {
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		return res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({
			success: false,
			error: 'User does not exist',
		});
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(404).json({
			success: false,
			error: 'Password is incorrect',
		});
	}
	const token = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_TOKEN, {
		expiresIn: '3 days',
	});
	return res.status(201).json({
		success: true,
		token,
		userType: user.userType,
	});
};

module.exports = {
	registerNewUser,
	loginUser,
};
