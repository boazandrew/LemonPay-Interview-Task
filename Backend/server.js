const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const todoRoute = require("./routes/todo.route");

dotenv.config();
const app = express();
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/auth", userRoute);
app.use("/api/todo", todoRoute);

app.get('/',(req,res)=> {
    res.send("API is running");
});

module.exports = app;