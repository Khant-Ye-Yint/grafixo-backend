const express = require('express');
const router = express.Router();

const Projects = require('../models/projects');

// import cloudinary upload
//const { upload, cloudinary } = require('../cloudinary');

// Import Middleware
const getProject = require('../middlewares/getProject');
//const authenticateToken = require('../middlewares/authenticateToken');

// Get all projects
router.get('/', async (req, res) => {
	try {
		const projects = await Projects.find();
		res.status(200).json(projects);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

// Get one project
router.get('/:id', getProject, (req, res) => {
	res.status(200).json(res.project);
});

// Add one project
router.post('/', async (req, res) => {
	const project = new Projects({
		name: req.body.name,
		client: req.body.client,
		price: req.body.price,
		description: req.body.description,
		thumbnailUrl: req.body.thumbnailUrl,
		imgUrls: req.body.imgUrls,
		vidUrl: req.body.vidUrl,
		category: req.body.category,
		featured: req.body.featured,
	});

	try {
		const newProject = await project.save();
		res.status(201).json(newProject);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update project
router.patch('/:id', getProject, async (req, res) => {
	if (req.body.name != null) {
		res.project.name = req.body.name;
	}
	if (req.body.client != null) {
		res.project.client = req.body.client;
	}
	if (req.body.price != null) {
		res.project.price = req.body.price;
	}
	if (req.body.description != null) {
		res.project.description = req.body.description;
	}
	if (req.body.category != null) {
		res.project.category = req.body.category;
	}
	if (req.body.featured != null) {
		res.project.featured = req.body.featured;
	}
	if (req.body.vidUrl != null) {
		res.project.vidUrl = req.body.vidUrl;
	}
	if (req.body.thumbnailUrl != null) {
		res.project.thumbnailUrl = req.body.thumbnailUrl;
	}
	if (req.body.imgUrls != null) {
		res.project.imgUrls = req.body.imgUrls;
	}

	try {
		const newProject = await res.project.save();
		res.status(200).json(newProject);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Delete one project
router.delete('/:id', getProject, async (req, res) => {
	try {
		// Delete image from cloudinary
		// await cloudinary.uploader.destroy(res.project.public_id);
		// Delete project from database
		await res.project.remove();
		res.status(200).json({ message: 'Project removed' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
