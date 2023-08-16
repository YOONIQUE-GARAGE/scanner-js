const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: { type: "console" }, // Log to the console
    file: { type: "file", filename: "app.log" }, // Log to a file
  },
  categories: {
    default: { appenders: ["console", "file"], level: "debug" }, // Log at the 'debug' level
  },
});

const logger = log4js.getLogger();

module.exports = logger;
