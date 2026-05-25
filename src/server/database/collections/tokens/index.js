import { tokenCollection } from "../../connections/index.js";

import saveWBTokenToDb from "./services/saveWBTokenToDb.js";
import removeTokenFromDb from "./services/removeTokenFromDb.js";
import getWBTokenByUserId from "./services/getWBTokenByUserId.js";

var tokenCollectionServices = {
  getWBTokenByUserId: (userId, session) => getWBTokenByUserId(tokenCollection, userId, session),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenCollection, userId, token, session),

  removeTokenFromDb: (userId) => removeTokenFromDb(tokenCollection, userId),
};

export default tokenCollectionServices;
