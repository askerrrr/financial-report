import { weeklyPricesAndDiscountsModel } from "../../../models/index.js";

var getUploadId = async (userId) => {
  var { uploadId } = await weeklyPricesAndDiscountsModel.findOne(
    { userId },
    {},
    { readPreference: "secondaryPreferred" },
  );

  return { uploadId };
};

export default getUploadId;
