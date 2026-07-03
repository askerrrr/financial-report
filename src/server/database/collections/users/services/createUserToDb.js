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

var mskTimeOffsetInMs = 10_800_000;

var createUserToDb = async (user, session) => {
  var { userId, role, login, passwd } = user;
  var hashedPasswd = await argon2.hash(passwd + "", "youSecretKey");

  await taxParamsCollection.insertOne({ userId }, session);
  await reportLoadingStatesCollection.insertOne({ userId }, session);
  await goodsCollection.insertOne({ userId, listGoods: [] }, session);
  await reportsTreeCollection.insertOne({ userId, years: [] }, session);
  await weeklyPricesAndDiscountsCollection.insertOne({ userId }, session);
  await tokenCollection.insertOne({ userId, schemaVersion: tokenSchemaVersion }, session);
  await reportCollection.insertOne({ userId, schemaVersion: reportsSchemaVersion }, session);
  await userCollection.insertOne({ login, userId, role, passwd: hashedPasswd, registeredAt: new Date(Date.now() + mskTimeOffsetInMs) }, session);
};

export default createUserToDb;
