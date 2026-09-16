import { tokenModel } from "../../../models/index.js";

var saveWBTokenToDb = async (userId, token, type, session) => {
  var sessionOpt = session ? { session: session } : {};

  var addedAt = new Date();

  await tokenModel.updateOne(
    { userId, type },
    {
      $set: { token },
      $setOnInsert: {
        type,
        userId,
        addedAt,
      },
    },
    { upsert: true, ...sessionOpt },
  );

  return { addedAt };
};

export default saveWBTokenToDb;
