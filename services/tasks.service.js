const taskModel = require("../database/Models/tasks.model");


async function createNewTask(req) {
    try {
        const {taskName, description, dueDate, priority, status} = req;
        if (!taskName || !dueDate || !priority || !status) {
            return {
                message: "Please provide all required fields",
                status: 400,
            };
        }
        const newTask = new taskModel({
            taskName,
            description,
            dueDate,
            priority,
            status,
        });

        await newTask.save();
        return {
            message: "Task created successfully " + newTask._id,
            status: 201,
        };
    } catch (error) {
        throw new Error("Task not created ! " + error);
    }
}

module.exports = { createNewTask };