var argon2 = require("argon2");
var {
  userCollection,
  goodsCollection,
  tokenCollection,
  reportCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
} = require("../../../connections");
var { tokenSchemaVersion } = require("../../../migration/schemaVersioning/tokenCollection");
var { reportsSchemaVersion } = require("../../../migration/schemaVersioning/reportsCollection");

var createUserToDb = async ({ userId, login, passwd }, session) => {
  var hashedPasswd = await argon2.hash(passwd + "", "youSecretKey");

  await taxParamsCollection.insertOne({ userId }, session);
  await reportLoadingStatesCollection.insertOne({ userId }, session);
  await goodsCollection.insertOne({ userId, listGoods: [] }, session);
  await reportsTreeCollection.insertOne({ userId, years: [] }, session);
  await weeklyPricesAndDiscountsCollection.insertOne({ userId }, session);
  await userCollection.insertOne({ login, userId, passwd: hashedPasswd }, session);
  await tokenCollection.insertOne({ userId, schemaVersion: tokenSchemaVersion }, session);
  await reportCollection.insertOne({ userId, schemaVersion: reportsSchemaVersion }, session);
};

module.exports = createUserToDb;
