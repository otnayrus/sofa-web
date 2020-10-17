require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const routes = require('./routes');

// db connection
require('./database');

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('client/build'));

// routes
app.use(routes);

// Bootstrap server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});