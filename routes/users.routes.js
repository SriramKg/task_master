const express = require('express');
const router = express.Router();

const { registerUser, loginUser, updateUser } = require('../controllers/users.controller');
const validateUser = require('../middlewares/users.validate');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', validateUser, updateUser);

module.exports = router;