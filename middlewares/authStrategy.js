const jwt = require('jsonwebtoken');
const { SUPER_ADMIN, READER } = require('../constants/userTypes');
const User = require('../models/User');

const authProtection = async (req, res, next) => {
	const token = req.header('Authorization').split(' ')[1];
	if (!token) {
		res.status(404).json({
			success: false,
			message: 'Access denied',
		});
	}
	try {
		const verifiedUser = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
		req.user = await User.findById(verifiedUser.userId);
		next();
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

const isAdmin = (req, res, next) => {
	const { user } = req;
	if (user.userType === READER) {
		return res.status(404).json({
			success: false,
			message: 'Access denied',
		});
	}
	next();
};

const isSuperAdmin = (req, res, next) => {
	const { user } = req;
	if (user.userType !== SUPER_ADMIN) {
		return res.status(404).json({
			success: false,
			message: 'Access denied',
		});
	}
	next();
};

module.exports = { authProtection, isAdmin, isSuperAdmin };
