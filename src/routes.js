const { Router } = require('express');
const PlayerController = require('./controllers/PlayerController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes
.get('/players', PlayerController.index)
.post('/players', PlayerController.store)
.delete('/players', PlayerController.delete);

routes
.get('/search', SearchController.index);

module.exports = routes;