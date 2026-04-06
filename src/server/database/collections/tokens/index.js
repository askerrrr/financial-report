import { tokenCollection } from  "../../connections/index.js";
import saveWBTokenToDb from  "./services/saveWBTokenToDb.js";
import getWBTokenByUserId from  "./services/getWBTokenByUserId.js";

var tokenCollectionServices = {
  getWBTokenByUserId: (userId, session) => getWBTokenByUserId(tokenCollection, userId, session),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenCollection, userId, token, session),
};

export default tokenCollectionServices;
