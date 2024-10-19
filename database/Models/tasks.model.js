const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: [true, "Task name is required"],
        maxLength: 255,
        trim: true,
    },
    description: {
        type: String,
        maxLength: 1000,
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        required: [true, "Priority is required"],
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        required: [true, "Status is required"],
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    tags : {
        type: [String],
        maxLength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    attachments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Attachment",
        },
    ],
    teamId: {
        type: Schema.Types.ObjectId,
        ref: "Team",
    },
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
