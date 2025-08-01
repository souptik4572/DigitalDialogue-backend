import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	associatedBlog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog",
	},
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
