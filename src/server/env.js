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

    S3Client_OPTIONS: {
      value: {
        region: process.env.s3_region,
        endpoint: process.env.s3_endpoint,
        credentials: { accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY },
      },
    },

    bucketName: { value: process.env.bucketName },
  }
);

module.exports = env;
