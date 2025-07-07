var env = Object.create(
  {},
  {
    PORT: { value: 5000 || process.env.PORT },

    HOST: { value: "127.0.0.1" || process.env.HOST },

    mongo_uri: {
      value: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/users`,
    },

    mongoose_options: {
      value: {
        user: "login",
        pass: "passwd",
        authSource: "admin",
        authMechanism: "SCRAM-SHA-1",
      },
    },
  }
);

module.exports = env;
