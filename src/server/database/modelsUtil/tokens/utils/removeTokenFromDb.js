import { tokenModel } from "../../../models/index.js";

var removeTokenFromDb = async (userId, type) => {
  await tokenModel.deleteOne({ userId, type });
};

export default removeTokenFromDb;
