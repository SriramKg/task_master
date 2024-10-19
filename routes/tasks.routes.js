const express = require('express');
const router = express.Router();

const { createTask, getAssignedTasks, updateTask } = require('../controllers/tasks.controller');
const validateUser = require('../middlewares/users.validate');
const {authorizeUser, authorizeUserForUpdate} = require('../middlewares/authorize.validate');

router.post('/create',validateUser, authorizeUser, createTask);
router.get('/assigned/:id', validateUser, getAssignedTasks);
router.put('/update/:id', validateUser, authorizeUserForUpdate, updateTask);

module.exports = router;