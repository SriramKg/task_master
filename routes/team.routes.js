const express = require('express');
const router = express.Router();

const {authorizeUser, authorizeUserForUpdate} = require('../middlewares/authorize.validate');
const validateUser = require('../middlewares/users.validate');
const createTeam = require('../controllers/teams.controller');

router.post('/createTeam', validateUser, authorizeUser, createTeam);

module.exports = router;