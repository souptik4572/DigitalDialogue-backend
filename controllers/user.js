const User = require('../models/User');

/**
 * @description API to get all users who are present in our application
 * @route GET /
 * @access Private, only accessible by SUPER_ADMIN users
 */
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({
			_id: {
				$ne: req.user._id,
			},
		});
		return res.status(200).json({
			success: true,
			users,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to change/update the userType/permission of the particular user
 * @route PATCH /:userId/changedesignation
 * @param userId
 * @access Private, only accessible by SUPER_ADMIN users
 */
const changeUserDesignation = async (req, res) => {
	const { userId } = req.params;
	const { newUserType } = req.body;
	try {
		const user = await User.findByIdAndUpdate(userId, { userType: newUserType }, { new: true });
		return res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to delete an existing user from our database
 * @route DELETE /:userId
 * @param userId
 * @access Private, only accessible by SUPER_ADMIN users
 */
const deleteParticularUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findByIdAndDelete(userId);
		return res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	getAllUsers,
	changeUserDesignation,
	deleteParticularUser,
};
