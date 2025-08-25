var env = Object.create(
  {},
  {
    PORT: { value: process.env.PORT || 5000 },

    HOST: { value: process.env.HOST || "127.0.0.1" },

    getMongoURI: {
      value: () =>
        process.env.MONGO_HOST ? `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/reports` : "mongodb://127.0.0.1:27017/reports",
    },

    mongoose_options: {
      value: {
        user: process.env.MONGO_INITDB_ROOT_USERNAME || "admin",
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD || "passwd",
        authSource: "admin",
        authMechanism: "SCRAM-SHA-1",
      },
    },

    secretKey: { value: "youSecretKey" },
  }
);

module.exports = env;
