const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes');
const dbConfig = require('./db/config');

// Connect to DB
mongoose.connect(dbConfig.url, () => {
  console.log('Connected to MongoDB.');
});

// Middleware
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;
