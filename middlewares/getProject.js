const Project = require('../models/projects');

const getProject = async (req, res, next) => {
	const id = req.params.id;
	let project;
	try {
		project = await Project.findById(id);
		if (project == null) {
			return res.status(404).json({ message: 'Project not found.' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.project = project;
	next();
};

module.exports = getProject;
