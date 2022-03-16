const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	client: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	vidUrl: {
		type: String,
		required: true,
	},
	thumbnailUrl: {
		type: String,
		required: true,
	},
	imgUrls: {
		type: String,
		required: true,
	},
	featured: {
		type: Boolean,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	// public_id: {
	// 	type: String,
	// 	required: true,
	// },
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Projects', projectSchema);
