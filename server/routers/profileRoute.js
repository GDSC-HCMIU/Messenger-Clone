const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const profileHandler = require('../controller/profileHandler');

router.get('/edit', auth, profileHandler.editProfile);