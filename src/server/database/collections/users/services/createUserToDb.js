import argon2 from "argon2";
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
import tokenSchemaVersion from "../../../migration/schemaVersioning/tokenCollection.js";
import { reportsSchemaVersion } from "../../../migration/schemaVersioning/reportsCollection.js";

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

export default createUserToDb;
