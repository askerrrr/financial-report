import { userModel } from "../../../models/index.js";

var getUserByLogin = async (login, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var user = await userModel.findOne({ login }, null, { ...sessionOptions });
  return user;
};

export default getUserByLogin;
