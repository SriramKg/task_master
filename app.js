const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
dotenv.config();

const userRoutes = require("./routes/users.routes");
const taskRoutes = require("./routes/tasks.routes");
const teamRoutes = require("./routes/team.routes");

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);

const connectionString = process.env.MONGO_URI;
const db = process.env.DB_NAME;
mongoose
  .connect(connectionString + db)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection failed. Exiting now...");
    console.error(err);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
