import checkWBTokenExists from "./checkWBTokenExists.js";
import openReportPeriodModal from "./services/reportLoader/index.js";

var reportLoaderHandler = () =>
  (document.getElementById("period-button").onclick = async (e) => {
    e.preventDefault();

    var result = await checkWBTokenExists();

    if (!result.tokenIsExist) {
      if (result.error) {
        alert(result.errorMsg);
      } else {
        alert("В первую очередь нужно загрузить токен личного кабинета WB");
      }

      return;
    }
    await openReportPeriodModal();
  });

export default reportLoaderHandler;
