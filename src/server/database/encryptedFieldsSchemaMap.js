var getEncryptionFieldsSchemaMap = (dataKeyId) => {
  var schemaMap = {
    [`${process.env.DB_NAME}.tokens`]: {
      bsonType: "object",
      encryptMetadata: {
        keyId: [dataKeyId],
      },
      properties: {
        token: {
          encrypt: {
            bsonType: "string",
            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
          },
        },
      },
    },
    [`${process.env.DB_NAME}.users`]: {
      bsonType: "object",
      encryptMetadata: {
        keyId: [dataKeyId],
      },
      properties: {
        passwd: {
          encrypt: {
            bsonType: "string",
            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
          },
        },
      },
    },
  };

  return { schemaMap };
};

export default getEncryptionFieldsSchemaMap;
