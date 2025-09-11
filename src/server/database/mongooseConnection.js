var env = require("../env");

var mongooseConnection = async (mongoose) => await mongoose.connect(env.getMongoURI(), env.mongoose_options);

module.exports = mongooseConnection;
