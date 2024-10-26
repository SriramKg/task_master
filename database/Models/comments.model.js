const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        maxLength: 1000,
    },
    attachment: {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
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

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;