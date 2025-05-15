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

module.exports = { DatabaseError };
