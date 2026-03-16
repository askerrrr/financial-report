var { DatabaseError } = require("../../../../customError");
var { reportsSchemaVersion } = require("../../../migration/schemaVersioning/reportsCollection");

var createReportsEntity = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  try {
    var reportsEntity = await collection.insertOne({ userId, schemaVersion: reportsSchemaVersion }, sessionOpt);

    var result = await reportsEntity.save();

    return result._id;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createReportsEntity;
