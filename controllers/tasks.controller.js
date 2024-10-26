const { createNewTask, getAssignedTasksForUser, updateTaskDetails, getAllTasks } = require("../services/tasks.service");
const { createNewTaskComment, createNewTaskAttachment } = require("../services/comments.service");

async function createTask(req, res) {
    try {
        const { message, status } = await createNewTask(req.body);
        res.status(status).send({
            message,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

async function getAssignedTasks(req, res) {
    try {
        const { message, status, tasksAssigned } = await getAssignedTasksForUser(req);
        res.status(status).send({
            message,
            tasksAssigned,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

async function updateTask(req, res) {
    try {
        const { message, status } = await updateTaskDetails(req);
        res.status(status).send({
            message,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

async function getTasks(req, res) {
    try {
        const { message, status, tasks } = await getAllTasks(req);
        res.status(status).send({
            message,
            tasks,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

async function createTaskComment(req, res) {
    try {
        const { message, status } = await createNewTaskComment(req);
        res.status(status).send({
            message,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

async function createTaskAttachment(req, res) {
    try {
        console.log("Im in controller");
        const { message, status } = await createNewTaskAttachment(req);
        res.status(status).send({
            message,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
        });
    }
}

module.exports = { createTask, getAssignedTasks, updateTask, getTasks, createTaskComment, createTaskAttachment };