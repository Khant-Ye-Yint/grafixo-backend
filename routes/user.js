const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const User = require('../models/user');

// Import middleware
// const authenticateToken = require('../middlewares/authenticateToken');

// Joi Schema
const userSchema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
});

// Register User
router.post('/register', async (req, res) => {
	const { error } = userSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	// Check if the user already exists
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist)
		return res.status(400).json({ message: 'Email already exists.' });

	// Hash password
	const hash = await bcrypt.hash(req.body.password, 10);

	// Create new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hash,
	});

	try {
		const newUser = await user.save();
		res.status(201).json({ userId: newUser.id });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Login User
router.post('/login', async (req, res) => {
	const { value, error } = loginSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	// Check if the user already exists
	const user = await User.findOne({ email: value.email });
	if (!user) return res.status(401).json({ message: 'Email does not exist.' });

	// Password Check
	const result = await bcrypt.compare(value.password, user.password);
	if (!result)
		return res.status(401).json({ message: 'Password is not correct.' });

	const accessToken = jwt.sign(
		{ userId: user.id },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30m' }
	);
	res.status(200).json({ message: 'Success', accessToken });
});

module.exports = router;
