import { tokenModel } from "../../../models/index.js";

var getUserWBTokens = async (userId, session) => {
  var sessionOpt = session ? { session } : {};

  var tokens = await tokenModel.find({ userId }, {}, { ...sessionOpt });

  return { tokens };
};

export default getUserWBTokens;
