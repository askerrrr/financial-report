import { tokenModel } from "../../../models/index.js";

var getWBTokenByType = async (userId, tokenType, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var data = await tokenModel.findOne(
    { userId, type: tokenType },
    { _id: 0 },
    { ...sessionOptions },
  );

  return { token: data?.token };
};

export default getWBTokenByType;
