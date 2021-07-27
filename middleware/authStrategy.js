const jwt = require('jsonwebtoken');
const { READER } = require('../constants/userTypes');

const authProtection = (req, res, next) => {
	const token = req.header('Authorization').split(' ')[1];
	if (!token) {
		res.status(404).json({
			success: false,
			error: 'Access denied',
		});
	}
	try {
		const user = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
		req.user = user;
		next();
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const isAdmin = (req, res, next) => {
	const { user } = req;
	if (user.userType == READER) {
		return res.status(404).json({
			success: false,
			error: 'Access denied',
		});
	}
	next();
};

module.exports = { authProtection, isAdmin };
