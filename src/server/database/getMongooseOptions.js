import { ClientEncryption } from "mongodb";
import getEncryptionFieldsSchemaMap from "./encryptedFieldsSchemaMap.js";

var getMongooseOptions = async (dbClientToEncryption) => {
  var dataKeyId = null;
  var cachedOptions = null;

  var keyVaultNamespace = process.env.KEY_VAULT_NAME_SPACE;
  var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
  var extraOptions = {
    cryptSharedLibRequired: true,
    cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH,
  };

  var auth = {
    username: process.env.MONGO_AUTH_USER,
    password: process.env.MONGO_AUTH_PWD,
  };

  await dbClientToEncryption.connect();

  var keyVault = dbClientToEncryption
    .db(process.env.KEY_VAULT_DATABASE_NAME)
    .collection(process.env.KEY_VAULT_COLLECTION_NAME);

  var existingKey = await keyVault.findOne({
    keyAltNames: process.env.MONGO_KEY_ALT_NAME,
  });

  if (!existingKey) {
    var encryption = new ClientEncryption(dbClientToEncryption, {
      kmsProviders,
      keyVaultNamespace,
    });

    dataKeyId = await encryption.createDataKey("local", {
      keyAltNames: [process.env.MONGO_KEY_ALT_NAME],
    });
  } else {
    dataKeyId = existingKey._id;
  }

  var { schemaMap } = getEncryptionFieldsSchemaMap(dataKeyId);

  var authOptions = JSON.parse(process.env.MONGO_AUTH_OPTIONS);

  cachedOptions = {
    auth,
    autoEncryption: {
      schemaMap,
      kmsProviders,
      extraOptions,
      keyVaultNamespace,
    },
    ...authOptions,
    autoIndex: false,
    serverSelectionTimeoutMS: 30_000,
    authSource: process.env.MONGO_AUTH_DB,
    authMechanism: process.env.MONGO_AUTH_MECHANISM || "SCRAM-SHA-1",
  };

  await dbClientToEncryption.close();

  return cachedOptions;
};

export default getMongooseOptions;
