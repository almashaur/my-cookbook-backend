// Requires go here
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Database connection
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Controllers go here
const userRouter = require("./controllers/users");
const recipeRouter = require("./controllers/recipes");
const authRouter = require("./controllers/auth");

// Middleware go here

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes go here
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/recipes", recipeRouter);

// App listener
app.listen(3000, () => {
  console.log("The express app is ready!");
});
