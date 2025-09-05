var { DatabaseConnectionError } = require("../../customError");

var mongoose = require("mongoose");

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
