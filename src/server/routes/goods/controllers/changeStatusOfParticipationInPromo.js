import dbUtils from "../../../database/collections/index.js";

var changeStatusOfParticipationInPromo = async (req, res, next) => {
  console.log(req.body);

  return res.sendStatus(200);
};

export default changeStatusOfParticipationInPromo;
