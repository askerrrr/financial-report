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

class DatabaseConnectionError extends Error {
  constructor(message) {
    super(message);

    this.message = "Database connection is not established";
  }
}

class WBAPIError extends Error {
  constructor(userId, status, message) {
    super(message);
    this.userId = userId;
    this.status = status;
    this.message = message;
  }
}

class ReportNotFoundError extends Error {
  constructor(reportId, message) {
    super(message);

    this.status = 404;
    this.message = `the report with id ${reportId} the was not found`;
  }
}

module.exports = {
  DatabaseError,
  WBAPIError,
  ReportNotFoundError,
  DatabaseConnectionError,
};
