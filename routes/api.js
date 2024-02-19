const express = require('express');
const router = express.Router();
const player_controller = require('../controllers/playerController');

// GET request to read all Players.
router.get('/players', player_controller.players_read);

// POST request to create Player.
router.post('/players', player_controller.player_create);

// DELETE request to delete Player.
router.delete('/players/:id', player_controller.player_delete);

// PUT request to update Player.
router.put('/players/:id', player_controller.player_update);

module.exports = router;
