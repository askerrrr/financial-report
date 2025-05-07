var errorHandler = async (e, req, res, next) => {
  console.log("AppError: ", e);
};

module.exports = errorHandler;
