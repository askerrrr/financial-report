import reportLoadingStatesCollectionServices from "../../../database/collections/reportLoadingStates/index.js";

var loadedReports = [{
      reportId: 337986030,
      year: 2025,
      month: 'апрель',
      dateFrom: '2025-04-14',
      dateTo: '2025-04-20',
      totalTaxAmount: 196.5,
      periodIndex: 63
    },{
      reportId: 337986030,
      year: 2025,
      month: 'апрель',
      dateFrom: '2025-04-14',
      dateTo: '2025-04-20',
      totalTaxAmount: 196.5,
      periodIndex: 63
    },]

var reportLoadingStateStub = {
    userId: '2fea8c5b97449a59d49b',
    reportsQueue: [],
    loadingInProgress: true,
    abandonedReports: [],
    lastReportRequestTimestamp: 1781205423422,
    isReportLoadingDelayed: false,
    isReportLoadingisStopped: false,
    queueLength: 1,
    queueCapacity: 2,
    isReportLoadingIsStopped: false,
    loadingStopReason: ''
  }

var session = null;

var selectedFieldsToLoadingState = [
  "queueLength",
  "reportsQueue",
  "queueCapacity",
  "abandonedReports",
  "loadingInProgress",
  "loadingStopReason",
  "isReportLoadingDelayed",
  "isReportLoadingIsStopped",
];

var index = 0;

var getReportLoadingState = async (req, res, next) => {
  var { userId } = req.params;
  reportLoadingStateStub.lastLoadedReport = loadedReports[index];
  index++
  console.log({index})
  var reportLoadingState = reportLoadingStateStub//await reportLoadingStatesCollectionServices.getReportLoadingState(userId, session, selectedFieldsToLoadingState);
if(index === 1) {
  index = 0
}
  return res.json(reportLoadingState);
};

export default getReportLoadingState;
