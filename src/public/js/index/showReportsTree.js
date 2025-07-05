import getReportsData from "./services/getReportsData.js";
import openLastDetails from "./services/openLastDetails.js";
import showNoReportsMessage from "./services/showNoReportsMessage.js";
import createReportsTree from "./services/reportTreeBuilder/createReportTree/index.js";

var showReportsTree = async () => {
  var { years } = await getReportsData();

  if (!years.length) {
    return showNoReportsMessage();
  }

  await createReportsTree(years);

  await openLastDetails(years);
};

export default showReportsTree;
