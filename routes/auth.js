const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');

router.post('/register', auth_controller.user_register);

router.post('/login', auth_controller.user_login);

router.post('/logout', auth_controller.user_logout);

router.get('/check', auth_controller.user_check);

router.get('/google', auth_controller.user_google);

router.get('/google/callback', auth_controller.user_google_callback);

module.exports = router;
