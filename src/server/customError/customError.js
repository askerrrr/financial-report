class DatabaseError extends Error {
  constructor(userId, e, message) {
    super(message);
    this.userId = userId;
    this.cause = e?.cause ?? "";
    this.stack = e?.stack ?? "";
    this.message = e?.message || message;
    this.name = this.constructor.name;
  }
}

class WBAPIError extends Error {
  constructor(userId, status, message, location) {
    super(message);
    this.userId = userId;
    this.status = status;
    this.message = message;
    this.location = location;
  }
}

module.exports = { DatabaseError, WBAPIError };
