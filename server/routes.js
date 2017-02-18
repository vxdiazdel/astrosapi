const express = require('express');
const routes = express();

const mainController = require('./controllers/mainController');

routes.get('/', mainController.getAstros);
routes.post('/', mainController.postAstros);

module.exports = routes;
