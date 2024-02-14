const express = require('express');
const router = express.Router();
const player_controller = require('../controllers/playerController');

// GET list of all Players.
router.get('/players', player_controller.player_list_get);

// POST request for creating Player.
router.post('/player/create', player_controller.player_create_post);

// POST request to delete Player.
router.post('/player/:id/delete', player_controller.player_delete_post);

// POST request to update Player.
router.post('/player/:id/update', player_controller.player_update_post);

module.exports = router;
