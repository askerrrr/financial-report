import { tokenModel } from "../../../models/index.js";

var getWBTokenByType = async (userId, tokenType, session) => {
  var sessionOpt = session ? { session } : {};

  var data = await tokenModel.findOne(
    { userId, type: tokenType },
    { _id: 0 },
    { ...sessionOpt },
  );

  return { token: data?.token };
};

export default getWBTokenByType;
