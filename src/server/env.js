var env = Object.create(
  {},
  {
    PORT: { value: 5000 || process.env.PORT },

    HOST: { value: "127.0.0.1" || process.env.HOST },

    mongo_uri: {
      value:
        "mongodb://127.0.0.1:27017/reports" ||
        `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/reports`,
    },

    mongoose_options: {
      value: {
        user: "Gilgamesh",
        pass: "Acu40929.$",
        authSource: "admin",
        authMechanism: "SCRAM-SHA-1",
      },
    },
  }
);

module.exports = env;
