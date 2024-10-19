const { createNewTask, getAssignedTasksForUser, updateTaskDetails } = require("../services/tasks.service");

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

module.exports = { createTask, getAssignedTasks, updateTask };