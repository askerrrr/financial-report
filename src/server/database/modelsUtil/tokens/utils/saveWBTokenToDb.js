import { tokenModel } from "../../../models/index.js";

var saveWBTokenToDb = async (userId, token, type, bitmask, session) => {
  var sessionOpt = session ? { session: session } : {};

  await tokenModel.updateOne(
    { userId, type },
    {
      $set: { token, bitmask },
      $setOnInsert: {
        type,
        userId,
        addedAt: new Date(),
      },
    },
    { upsert: true, ...sessionOpt },
  );
};

export default saveWBTokenToDb;
