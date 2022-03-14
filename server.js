const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || '5000';
const MONGODB_URI = process.env.MONGODB_URI;

const projects = require('./routes/projects');
const user = require('./routes/user');

//const authenticateToken = require('./middlewares/authenticateToken');

app.get('/', (req, res) => {
	res.send('Hello From Grafixo Backend');
});

//Middlewares
app.use(cors());
app.use(express.json());

// Connect to database
mongoose.connect(MONGODB_URI, () => console.log('Databse connected'));

// Use Routes
app.use('/api/projects', projects);
app.use('/api/user', user);

// Listen to server
app.listen(PORT, () =>
	console.log(
		`Server is listening at PORT ${PORT}, url: http://localhost:${PORT}`
	)
);
