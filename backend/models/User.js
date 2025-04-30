const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		minlength: 3,
		maxlength: 15,
		required: true
	},
	last_name: {
		type: String,
		minlength: 3,
		maxlength: 15,
		required: true
	},
	email: 
	{ 
		type: String, 
		required: true, 
		unique: true 
	},
	password: 
	{ 
		type: String, 
		required: true,
		minlength: 8,
	}
});

module.exports = mongoose.model("User", userSchema);
