const express = require('express');
const router = express.Router();

const { registerUser, loginUser, updateUser } = require('../controllers/users.controller');
const validateUser = require('../middlewares/users.validate');
const blackListToken = require('../middlewares/blacklist.validate');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', validateUser, updateUser);
router.post('/logout', validateUser, blackListToken);

module.exports = router;