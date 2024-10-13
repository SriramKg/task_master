const userModel = require("../database/Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerNewUser(body) {
  try {
    const { username, email, password, profileInfo } = body;
    if (!username || !email || !password || !profileInfo) {
      return {
        message: "Please provide all required fields",
        status: 400,
      };
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return {
        message: "User already exists. Please login",
        status: 400,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      profileInfo,
    });
    await newUser.save();
    return {
      message:
        "User registered successfully " +
        newUser._id +
        ". Welcome " +
        username +
        " you have successfully registered to the Task Tracker App",
      status: 201,
    };
  } catch (error) {
    throw new Error("User did not register ! " + error);
  }
}

async function loginAUser(body) {
  try {
    const secret = process.env.JWT_SECRET;
    const { email, password } = body;
    if (!email || !password) {
      return {
        message: "Please provide your email and password",
        status: 400,
      };
    }
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return {
        message: "User does not exist. Please try again",
        status: 404,
      };
    }
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
      return {
        message: "Invalid password. Please try again",
        status: 401,
      };
    } else {
      const payload = {
        id: findUser._id,
        email: findUser.email,
        username: findUser.username,
        profileInfo: findUser.profileInfo,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "2h" });
      return {
        message:
          "User logged in successfully " +
          findUser._id +
          ". Welcome back " +
          findUser.username,
        status: 200,
        token: token,
      };
    }
  } catch (error) {
    throw new Error("User did not login ! " + error);
  }
}

async function updateUserDetails(req) {
  try {
    const { email, profileInfo } = req.body;
    if (!email || !profileInfo) {
      return {
        message: "Please provide all required fields",
        status: 400,
      };
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return {
        message: "User does not exist. Please register",
        status: 404,
      };
    }
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        profileInfo,
      }
    );
    return {
      message:
        "User updated successfully " +
        updatedUser._id +
        ". Hey " +
        updatedUser.username +
        " your profile has been updated successfully",
      status: 200,
    };
  } catch (error) {
    throw new Error("User did not update ! " + error);
  }
}
module.exports = { registerNewUser, loginAUser, updateUserDetails };
