import {
  userCollection,
  goodsCollection,
  tokenCollection,
  reportCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
} from "../../../connections/index.js";

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

export default deleteUsersFromDb;
