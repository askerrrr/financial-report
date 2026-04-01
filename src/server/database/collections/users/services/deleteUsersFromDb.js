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

var deleteUsersFromDb = async (session) => {
  await userCollection.deleteMany({}, session);
  await tokenCollection.deleteMany({}, session);
  await reportCollection.deleteMany({}, session);
  await goodsCollection.deleteMany({}, session);
  await taxParamsCollection.deleteMany({}, session);
  await reportsTreeCollection.deleteMany({}, session);
  await reportLoadingStatesCollection.deleteMany({}, session);
  await weeklyPricesAndDiscountsCollection.deleteMany({}, session);
};
module.exports = deleteUsersFromDb;
