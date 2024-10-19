const express = require('express');
const router = express.Router();

const { createTask } = require('../controllers/tasks.controller');
const validateUser = require('../middlewares/users.validate');
const authorizeUser = require('../middlewares/authorize.validate');

router.post('/create',validateUser, authorizeUser, createTask);

module.exports = router;