const mongoose = require("mongoose");
const winston = require("winston");

module.exports = () => {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect("mongodb://localhost/pz_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      winston.info("Database connected successfully");
    })
    .catch(e => {
      // if any error throw the error
      throw new Error(e.message);
    });
};
