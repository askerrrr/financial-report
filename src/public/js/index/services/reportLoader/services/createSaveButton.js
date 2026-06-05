import checkDateTo from "./checkDateTo.js";
import checkDateFrom from "./checkDateFrom.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showLoader, deleteLoader } from "./loader.js";
import reportLoadingStatePanelBuilder from "../../../reportLoadingStatePanel/index.js";
import insertNewReportToTree from "../../reportTreeBuilder/insertNewReportToTree/index.js";

var isMainPageLoad = false;
var reportLoadState = null;
var userId = document.cookie.split("=")[1];

var createSaveButton = (modal, dateFromInput, dateToInput, uploadAllReportsCheckbox) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Отправить";

  button.onclick = async () => {
    try {
      document.body.removeChild(modal);

      var uploadAllReports = uploadAllReportsCheckbox.checked;

      if (!uploadAllReports) {
        var dateFrom = dateFromInput.value;
        var { validDateFrom } = await checkDateFrom(dateFrom);

        var dateTo = dateToInput?.value;

        var { validDateTo, isPeriodWithinSameWeek } = await checkDateTo(dateTo, validDateFrom);

        if (!isPeriodWithinSameWeek) {
          await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek);
          setTimeout(() => reportLoadingStatePanelBuilder(userId, reportLoadState, isMainPageLoad), 3000);
          return;
        }

        var reportData = await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek);

        await showLoader();

        if (!reportData) {
          await deleteLoader();
          return;
        }

        await deleteLoader();
        await insertNewReportToTree(reportData);

        var confirmed = confirm("Отчет успешно сохранен.\nПерейти к отчету?");

        if (confirmed) {
          window.location.href = "/report/" + reportData.reportId;
        }

        return;
      } else {
        var validDateFrom = "";
        var validDateTo = "";
        var isPeriodWithinSameWeek;
        await sendReportPeriod(userId, validDateFrom, validDateTo, isPeriodWithinSameWeek, uploadAllReports);
        return;
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
      await deleteLoader();
    }
  };

  return button;
};

export default createSaveButton;
