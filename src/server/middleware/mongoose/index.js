var env = require("../../env");
var mongoose = require("mongoose");
var { DatabaseConnectionError } = require("../../customError");

var mongooseConnection = async () => await mongoose.connect(env.getMongoURI(), env.mongoose_options).then(() => console.log("mongoose conected"));
mongoose.Promise = Promise;
mongoose.connection.on("error", () => mongoose.disconnect());
mongoose.connection.on("disconnected", () => setTimeout(mongooseConnection, 5000));

mongooseConnection();

var checkDBState = (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      next(new DatabaseConnectionError());
    }

    next();
  } catch (e) {
    if (e instanceof DatabaseConnectionError) {
      next(e);
    }

    next(new DatabaseConnectionError(e.message));
  }
};

module.exports = checkDBState;
