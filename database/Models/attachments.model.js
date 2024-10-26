const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
    attachment: {
        type: Buffer, // Use Buffer to store file data
        required: [true, "Attachment is required"],
    },
    fileType: {
        type: String,
        required: [true, "File type is required"],
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: [true, "Task ID is required"],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Created by is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const attachmentModel = mongoose.model("Attachment", attachmentSchema);
module.exports = attachmentModel;