import { tokenModel } from "../../../models/index.js";

var getWBTokens = async (userId, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var tokens = await tokenModel.find({ userId }, {}, { ...sessionOptions });

  return { tokens };
};

export default getWBTokens;
