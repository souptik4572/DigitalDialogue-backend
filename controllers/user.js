const User = require('../models/User');

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
			error: error.message,
		});
	}
};

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
			error: error.message,
		});
	}
};

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
			error: error.message,
		});
	}
};

module.exports = {
	getAllUsers,
	changeUserDesignation,
	deleteParticularUser,
};
