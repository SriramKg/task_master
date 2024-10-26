const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { createTask, getAssignedTasks, updateTask, getTasks, createTaskComment, createTaskAttachment} = require('../controllers/tasks.controller');
const validateUser = require('../middlewares/users.validate');
const {authorizeUser, authorizeUserForUpdate} = require('../middlewares/authorize.validate');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/create',validateUser, authorizeUser, createTask);
router.get('/assigned/:id', validateUser, getAssignedTasks);
router.put('/update/:id', validateUser, authorizeUserForUpdate, updateTask);
router.get('/getAllTasks', validateUser, getTasks);
router.post('/:taskId/comment', validateUser, authorizeUserForUpdate, createTaskComment);
router.post('/:taskId/attachment', validateUser, authorizeUserForUpdate, upload.single('attachment'), createTaskAttachment);

module.exports = router;