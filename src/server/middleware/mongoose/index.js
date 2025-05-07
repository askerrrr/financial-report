var mongoose = require("mongoose");

var mongooseConnection = async () => {
  var userDB = mongoose.connect("mongodb://127.0.0.1:27017");

  userDB.then(() => console.info("mongoose is connected"));
};

mongoose.Promise = Promise;

mongoose.connection.on("error", () => mongoose.disconnect());

mongoose.connection.on("disconnected", () =>
  setTimeout(mongooseConnection, 5000)
);

mongooseConnection();

var checkState = (req, res, next) => {
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

module.exports = checkState;
