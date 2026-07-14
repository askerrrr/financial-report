import JSZip from "jszip";
import getReportIdFromFileName from "./getReportIdFromFileName.js";
import extractWorkSheetFromFile from "./extractWorkSheetFromFile.js";

var extractWeeklyFinancialReportFilesFromZip = async (zipBuffers) => {
  var weeklyFinancialFilesBuffer = [];

  for (var zipBuffer of zipBuffers) {
    var zip = new JSZip();

    await zip.loadAsync(zipBuffer, { base64: true }).then(async ({ files }) => {
      for (var file of Object.keys(files)) {
        var fileName = files[file].name;
        var { reportId } = getReportIdFromFileName(fileName);

        var fileBuffer = await zip.file(fileName).async("nodebuffer");
        weeklyFinancialFilesBuffer.push(fileBuffer);
        break;
      }
    });
  }

  return { weeklyFinancialFilesBuffer };
};

export default extractWeeklyFinancialReportFilesFromZip;
// var existReport = weeklyFinancialFilesBuffer.find((report) => report?.reportId === reportId);

// if (existReport) {
//   existReport.buffers.push(fileBuffer);
//   existReport.buybackReportIsExist = true;
// } else {
//   weeklyFinancialFilesBuffer.push({ reportId, buffers: [fileBuffer], buybackReportIsExist: false });
// }
