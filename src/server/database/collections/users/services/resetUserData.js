import { dbClient } from "../../../index.js";
import {
  goodsCollection,
  reportCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
} from "../../../connections/index.js";

var defaultReportLoadingState = {
  queueLength: 0,
  queueCapacity: 0,
  loadingInProgress: false,
  lastReportRequestTimestamp: 0,
  isReportLoadingDelayed: false,
  isReportLoadingIsStopped: false,
  loadingStopReason: "",
  emptyReportPeriodsIndexes: [],
  reportsQueue: [],
  abandonedReports: [],
};

var resetUserData = async (userId) => {
  var success = true;
  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      await reportCollection.updateOne({ userId }, { $set: { reports: [] } }, { session });
      await goodsCollection.updateOne({ userId }, { $set: { listGoods: [] } }, { session });
      await taxParamsCollection.updateOne({ userId }, { $set: { years: [] } }, { session });
      await reportsTreeCollection.updateOne({ userId }, { $set: { years: [] } }, { session });
      await weeklyPricesAndDiscountsCollection.updateOne({ userId }, { $set: { weeklyPricesAndDiscounts: [] } });
      await reportLoadingStatesCollection.updateOne({ userId }, { $set: { ...defaultReportLoadingState } }, { session });
    });
  } catch {
    success = false;
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }

  return { success };
};

export default resetUserData;
