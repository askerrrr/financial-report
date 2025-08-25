import checkWBTokenExists from "./services/checkWBTokenExists.js";
import openReportPeriodModal from "./services/reportPeriodUploader/index.js";

var reportPeriodHander = async () => {
  var button = document.getElementById("period-button");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var tokenIsExists = await checkWBTokenExists();

    if (!tokenIsExists) {
      return alert(
        "В первую очередь нужно загрузить токен личного кабинета WB"
      );
    }

    await openReportPeriodModal();
  });
};

export default reportPeriodHander;
