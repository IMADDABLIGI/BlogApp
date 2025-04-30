const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you already have a User model

exports.protect = async (req, res, next) => {
	try {
		let token;

		// Check if token exists in the Authorization header
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		}

		// Check if token exists
		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Not authorized to access this route'
			});
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Get user from database
		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'User not found'
			});
		}

		// Attach user to request object
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: 'Not authorized to access this route'
		});
	}
};

/**
 * Check if the user is the owner of an article
 */
exports.checkArticleOwnership = async (req, res, next) => {
	try {
		const Article = require('../models/Article');
		const article = await Article.findById(req.params.id);

		if (!article) {
			return res.status(404).json({
				success: false,
				message: 'Article not found'
			});
		}

		// Check if logged in user is article owner
		if (article.author.toString() !== req.user.id) {
			return res.status(403).json({
				success: false,
				message: 'User not authorized to perform this action'
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message
		});
	}
};
