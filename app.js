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

app.use("/users", userRoutes);

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
