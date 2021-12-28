const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || '5000';
const MONGODB_URI = process.env.MONGODB_URI;

const projects = require('./routes/projects');

//Middlewares
app.use(express.json());

// Connect to database
mongoose.connect(MONGODB_URI, () => console.log('Databse connected'));

// Import Routes
app.use('/projects', projects);

// Listen to server
app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}...`));
