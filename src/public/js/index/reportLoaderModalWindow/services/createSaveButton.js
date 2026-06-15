import checkDateTo from "./checkDateTo.js";
import checkDateFrom from "./checkDateFrom.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showLoader, deleteLoader } from "./loader.js";
import { insertNewReportToTree } from "../../reportTreeBuilder/index.js";
import reportLoadingStatePanelBuilder from "../../reportLoadingStatePanel/index.js";

var isMainPageLoad = false;
var reportLoadState = null;

var createSaveButton = (userId, modal, dateFromInput, dateToInput, uploadAllReportsCheckbox) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Отправить";

  button.onclick = async () => {
    document.body.removeChild(modal);

    var needToLoadAllReports = uploadAllReportsCheckbox.checked;

    try {
      if (needToLoadAllReports) {
        var dateFrom = "";
        var dateTo = "";
        var isPeriodWithinSameWeek = false;
        await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek, needToLoadAllReports);

        setTimeout(() => reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad), 3000);
      } else {
        var dateFrom = dateFromInput.value;
        var dateTo = dateToInput?.value;

        var { validDateFrom } = checkDateFrom(dateFrom);
        var { validDateTo, isPeriodWithinSameWeek } = checkDateTo(dateTo, validDateFrom);

        if (isPeriodWithinSameWeek) {
          var reportData = await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek);

          await showLoader();

          if (!reportData) {
            await deleteLoader();
          }

          await deleteLoader().then(() => insertNewReportToTree(reportData));

          var confirmed = confirm("Отчет успешно сохранен.\nПерейти к отчету?");

          if (confirmed) {
            window.location.href = "/report/" + reportData.reportId;
          }
        } else {
          await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek);

          setTimeout(() => reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad), 3000);
        }
      }
    } catch (e) {
      alert("Произошла ошибка...");
    }
  };

  return button;
};

export default createSaveButton;
