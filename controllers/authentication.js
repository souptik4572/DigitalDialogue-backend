const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generating jwt token for authorization
const generateToken = (userId) => {
	const token = jwt.sign({ userId }, process.env.ACCESS_SECRET_TOKEN, {
		expiresIn: '3 days',
	});
	return token;
};

/**
 * @description API to register a completely new user in our database
 * @route PUT /register
 * @access Public
 */
const registerNewUser = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		return res.status(404).json({
			success: false,
			message: 'Email already exists',
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
			message: 'Successfully registered new user',
			token: generateToken(user._id),
			userType: user.userType,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to log in an existing user in our application, returns a JWT token for authorization for further steps
 * @route POST /login
 * @access Public
 */
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({
			success: false,
			message: 'User does not exist',
		});
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(404).json({
			success: false,
			message: 'Password is incorrect',
		});
	}
	return res.status(201).json({
		success: true,
		message: 'Logged in successfully',
		token: generateToken(user._id),
		userType: user.userType,
	});
};

module.exports = {
	registerNewUser,
	loginUser,
};
