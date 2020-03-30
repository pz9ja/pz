// error handling
// require("express-async-errors");
// const winston = require("winston");
// require("winston-mongodb");

// module.exports = () => {
//   const logger = winston.createLogger({
//     level: "info",
//     format: winston.format.json(),
//     // defaultMeta: { service: "user-service" },
//     transports: [
//       //
//       // - Write to all logs with level `info` and below to `combined.log`
//       // - Write all logs error (and below) to `error.log`.
//       //
//       new winston.transports.File({ filename: "error.log", level: "error" }),
//       new winston.transports.File({ filename: "combined.log" })
//     ]
//   });
//   logger.exceptions.handle()(
//     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//     new winston.transports.File({ filename: "uncaughtExceptions.log" })
//   );

//   //   logger.exceptions.handle(
//   //     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//   //     new winston.transports.File({ filename: "uncaughtExceptions.log" })
//   //   );

//   process
//     .on("unhandledRejection", err => {
//       throw err;
//       // process.exit(1);
//     })
//     .catch(e => {});

//   process.on("uncaughtException", error => {
//     // We can use winston to log the error
//     console.log(error.message);
//     process.exit(1);
//   });

//   //error handling

//   //error added to project files

//   //   logger.add(winston.transports.File, { filename: "logfile.log" });
//   //error added to mongodb
//   //   logger.add(winston.transports.MongoDB, {
//   //     db: "mongodb://localhost/pz_app",
//   //     level: "info"
//   //   });
//   return logger;
// };
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = () => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    // defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" })
    ]
  });

  //error handling

  //error added to project files
  //   winston.add(winston.transports.File, { filename: "logfile.log" });
  //error added to mongodb
  logger.exceptions.handle(
    new winston.transports.File({ filename: "exceptions.log" })
  );
  //   logger.add(winston.transports.MongoDB, {
  //     db: "mongodb://localhost/pz_app",
  //     level: "info"
  //   });
  return logger;
};
