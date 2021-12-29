const express = require('express');
const router = express.Router();

const Projects = require('../models/projects');

// import cloudinary upload
const { upload, cloudinary } = require('../cloudinary');

// Import Middleware
const getProject = require('../middlewares/getProject');

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
router.post('/', upload.single('image'), async (req, res) => {
	const project = new Projects({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		imgUrl: req.file.path,
		public_id: req.file.filename,
	});

	try {
		const newProject = await project.save();
		res.status(201).json(newProject);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Update project
router.patch('/:id', getProject, upload.single('image'), async (req, res) => {
	if (req.body.name != null) {
		res.project.name = req.body.name;
	}
	if (req.body.price != null) {
		res.project.price = req.body.price;
	}
	if (req.body.description != null) {
		res.project.description = req.body.description;
	}

	try {
		await cloudinary.uploader.destroy(res.project.public_id);
		res.project.public_id = req.file.filename;
		res.project.imgUrl = req.file.path;

		const newProject = await res.project.save();
		res.status(401).json(newProject);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Delete one project
router.delete('/:id', getProject, async (req, res) => {
	try {
		// Delete image from cloudinary
		await cloudinary.uploader.destroy(res.project.public_id);
		// Delete project from database
		await res.project.remove();
		res.status(200).json({ message: 'Project removed' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
