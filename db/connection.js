require("dotenv").config();
const mongoose = require("mongoose");
const url = `mongodb+srv://shristykashyap2000:qXCtlEDKiBjnebaE@cluster0.0cvwufa.mongodb.net/`;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
