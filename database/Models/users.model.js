const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxLength: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxLength: 255,
    trim: true,
  },
  bio: {
    type: String,
    maxLength: 1000,
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required"],
  },
  experience: {
    type: String,
    maxLength: 1000,
  },
  designation: {
    type: String,
    maxLength: 255,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    maxLength: 255,
    minlength: 4,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    maxLength: 255,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  profileInfo: [profileSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["ScrumMaster", "ProductOwner", "Developer", "QA", "User"],
    default: "User",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
