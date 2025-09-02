var { DatabaseError } = require("../../../../customError");
var { tokenSchemaVersion } = require("../../../migration/schemaVersioning/tokenCollection");

var createTokenCollectionEntity = async (collection, userId) => {
  try {
    var entity = await collection.insertOne({ userId, schemaVersion: tokenSchemaVersion });

    await entity.save();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = createTokenCollectionEntity;
