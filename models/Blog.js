const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
	image: {
		type: String,
		default: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	usersWhoLiked: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
	createdOn: {
		type: Date,
		default: Date.now,
	},
	updatedOn: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
