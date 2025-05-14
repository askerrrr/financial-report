class FileMimeTypeError extends Error {
  constructor(message) {
    super(message);

    this.message = "Invalid file mimetype";
  }
}

module.exports = { FileMimeTypeError };
