const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Article title is required'],
			trim: true,
			maxLength: [100, 'Title cannot be more than 100 characters']
		},
		content: {
			type: String,
			required: [true, 'Article content is required']
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		category: {
			type: String,
			enum: ['Success Story', 'challenge', 'lesson learned', 'advice'],
			required: true
		},
		created_at: {
			type: Date,
			default: Date.now,
		}
	}, {
	timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);