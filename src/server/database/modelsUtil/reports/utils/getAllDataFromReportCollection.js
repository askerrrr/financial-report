import { reportModel } from "../../../models/index.js";

var getAllDataFromReportCollection = async () => {
  var data = await reportModel.find(
    {},
    {},
    { readPreference: "secondaryPreferred" },
  );

  return data.map((item) => item.toObject());
};

export default getAllDataFromReportCollection;
