const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: "Email already exists" });

		const hashed = await bcrypt.hash(password, 10);
		const user = new User({ first_name, last_name, email, password: hashed });
		await user.save();

		res.status(201).json({ message: "User registered" });
	} catch (err) {
		res.status(500).json({ message: err});
	}
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: "User not found" });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(401).json({ message: "Invalid credentials" });

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
		res.json({ token : token });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};
