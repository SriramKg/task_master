const { createNewTask } = require("../services/tasks.service");

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

module.exports = { createTask };