const taskModel = require("../database/Models/tasks.model");
const UserModel = require("../database/Models/users.model");


async function createNewTask(req) {
    try {
        const {taskName, description, dueDate, priority, status, assignedTo} = req;
        console.log(assignedTo);
        if (!taskName || !dueDate || !priority || !status || !assignedTo) {
            return {
                message: "Please provide all required fields",
                status: 400,
            };
        }
        const findUser = await UserModel.findOne({ email: assignedTo });
        console.log(findUser+"findUser");
        console.log(findUser._id);
        if (!findUser) {
            return {
                message: "User does not exist. Please try again",
                status: 404,
            };
        }
        const newTask = new taskModel({
            taskName,
            description,
            dueDate,
            priority,
            status,
            assignedTo: findUser._id,
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

async function getAssignedTasksForUser(req) {
    try {
        const {id} = req.params;
        const tasks = await taskModel.find({ assignedTo: id });
        console.log(tasks);
        if (!tasks) {
            return {
                message: "No tasks assigned to this user",
                status: 404,
            };
        }
        return {
            message: "Tasks fetched successfully",
            status: 200,
            tasksAssigned: [
                tasks.map((task) => {
                    return {
                        taskName: task.taskName,
                        description: task.description,
                    };
                }),
              ],
        };
    } catch (error) {
        throw new Error("Error in fetching tasks ! " + error);
    }
}

async function updateTaskDetails(req) {
    try {
        const { id } = req.params;
        const {taskName, description, status, dueDate, priority, assignedTo } = req.body;
        if (!taskName || !description || !status || !dueDate || !priority || !assignedTo) {
            return {
                message: "Please provide all required fields",
                status: 400,
            };
        }
        const task = await taskModel.findOne({ _id: id });
        const findUser = await UserModel.findOne({ email: assignedTo });
        if (!task) {
            return {
                message: "Task does not exist",
                status: 404,
            };
        }
        task.taskName = taskName;
        task.description = description;
        task.status = status;
        task.dueDate = dueDate;
        task.priority = priority;
        task.assignedTo = findUser._id;
        await task.save();
        return {
            message: "Task updated successfully",
            status: 200,
        };
    } catch (error) {
        throw new Error("Task not updated ! " + error);
    }
}

async function getAllTasks(req) {
    try {
        let tasks;
        const status = req.query.status;
        const search = req.query.search;
        if (search) {
            tasks = await taskModel.find({ $or: [{ taskName: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }] });
        }
        else if (status) {
            tasks = await taskModel.find({ status });
        }
        else {
            tasks = await taskModel.find();
        }
        if (!tasks) {
            return {
                message: "No tasks found",
                status: 404,
            };
        }
        return {
            message: "Tasks fetched successfully",
            status: 200,
            tasks: [
                tasks.map((task) => {
                    return {
                        taskName: task.taskName,
                        description: task.description,
                        status: task.status,
                        dueDate: task.dueDate,
                        priority: task.priority,
                        assignedTo: task.assignedTo,
                    };
                }),
              ],
        };
    } catch (error) {
        throw new Error("Error in fetching tasks ! " + error);
    }
}

module.exports = { createNewTask, getAssignedTasksForUser, updateTaskDetails, getAllTasks };