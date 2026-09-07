import { tokenModel } from "../../../models/index.js";

var getWBTokenByType = async (userId, tokenType, session) => {
  var sessionOpt = session ? { session } : {};

  var token = await tokenModel.findOne(
    { userId, type: tokenType },
    {},
    { ...sessionOpt },
  );

  return { token };
};

export default getWBTokenByType;
