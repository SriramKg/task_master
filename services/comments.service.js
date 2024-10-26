const taskModel = require("../database/Models/tasks.model");
const commentModel = require("../database/Models/comments.model");
const attachmentModel = require("../database/Models/attachments.model");
const fs = require('fs').promises;

async function createNewTaskComment(req) {
    try {
        const {taskId} = req.params;
        const { comment } = req.body;
        //console.log(comment);
        const task = await taskModel.findById(taskId);
        //console.log(req.userInfo.id);
        if (!task) {
            return {
                message: "Task not found",
                status: 404,
            };
        }
        const newComment = {
            comment,
            commentedBy: req.userInfo.id,
            task: taskId,
        };
        await commentModel.create(newComment);
        console.log(newComment);
        task.comments.push(newComment._id);
        await task.save();
        return {
            message: "Comment added successfully",
            status: 200,
        };
    } catch (error) {
        throw new Error("Comment not added ! " + error);
    }
}

async function createNewTaskAttachment(req) {
    try {
        const { taskId } = req.params;
        const attachment  = req.file;
        const task = await taskModel.findById(taskId);
        if (!task) {
            return {
                message: "Task not found",
                status: 404,
            };
        }
        const fileData = await fs.readFile(attachment.path);

        const newAttachment = {
            attachment: fileData,
            createdBy: req.userInfo.id,
            taskId: taskId,
            fileType: attachment.mimetype,
        };
        await attachmentModel.create(newAttachment);
        task.attachments.push(newAttachment._id);
        await task.save();
        return {
            message: "Attachment added successfully",
            status: 200,
        };
    } catch (error) {
        throw new Error("Attachment not added! " + error);
    }
}

module.exports = { createNewTaskComment, createNewTaskAttachment };