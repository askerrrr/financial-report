import ExcelJs from "exceljs";
import getReportPeriod from "./getReportPeriod.js";
import generateColumnNames from "./generateColumnNames.js";
import getRequiredColumnsName from "./getRequiredColumnsName.js";

var extractWorkSheetFromFile = async (weeklyFinancialFilesBuffer) => {
  var workSheets = [];

  for (var fileBuffer of weeklyFinancialFilesBuffer) {
    var wb = new ExcelJs.Workbook();

    await wb.xlsx.load(fileBuffer);

    var workSheet = wb.getWorksheet("Sheet1" || "Лист1");
    var { columnsNames } = generateColumnNames(workSheet.actualColumnCount);
    var { requiredColumnsName } = getRequiredColumnsName(workSheet, columnsNames);

    var { dateFrom, dateTo } = getReportPeriod(workSheet, requiredColumnsName);
    
    var existReportPeriod = workSheets.find((item) => item?.dateFrom >= dateFrom && item?.dateTo >= dateTo);

    if (existReportPeriod) {
      existReportPeriod.oneReportPeriodWorkSheets.push({ workSheet, workSheetData: { columnsNames, requiredColumnsName } });
    } else {
      workSheets.push({ oneReportPeriodWorkSheets: [{ workSheet, workSheetData: { columnsNames, requiredColumnsName } }], dateFrom, dateTo });
    }
  }

  console.log(workSheets);
  return { workSheets };
};

export default extractWorkSheetFromFile;
