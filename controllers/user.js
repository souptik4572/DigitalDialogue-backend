import User from "../models/User.js";

/**
 * @description API to get all users who are present in our application
 * @route GET /
 * @access Private, only accessible by SUPER_ADMIN users
 */
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({
			_id: {
				$ne: req.user._id,
			},
		});
		return res.status(200).json({
			success: true,
			message: "List of existing users in our system",
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
export const changeUserDesignation = async (req, res) => {
	const { userId } = req.params;
	const { newUserType } = req.body;
	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ userType: newUserType },
			{ new: true }
		);
		return res.status(200).json({
			success: true,
			message: `Successfully changed user designation to ${newUserType}`,
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
export const deleteParticularUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findByIdAndDelete(userId);
		return res.status(200).json({
			success: true,
			message: "User has been deleted successfully",
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};
