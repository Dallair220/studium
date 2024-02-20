const express = require('express');
const router = express.Router();
const player_controller = require('../controllers/playerController');
const isAuthenticated = require('../utils/authUtils');

// GET request to read all Players.
router.get('/', player_controller.players_read);

// POST request to create Player.
router.post('/', isAuthenticated, player_controller.player_create);

// DELETE request to delete Player.
router.delete('/:id', isAuthenticated, player_controller.player_delete);

// PUT request to update Player.
router.put('/:id', player_controller.player_update);

module.exports = router;
