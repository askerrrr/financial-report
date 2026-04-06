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

var deleteUserFromDb = async (userId, session) => {
  await userCollection.deleteOne({ userId }, session);
  await tokenCollection.deleteOne({ userId }, session);
  await reportCollection.deleteOne({ userId }, session);
  await goodsCollection.deleteOne({ userId }, session);
  await taxParamsCollection.deleteOne({ userId }, session);
  await reportsTreeCollection.deleteOne({ userId }, session);
  await reportLoadingStatesCollection.deleteOne({ userId }, session);
  await weeklyPricesAndDiscountsCollection.deleteOne({ userId }, session);
};
export default deleteUserFromDb;
