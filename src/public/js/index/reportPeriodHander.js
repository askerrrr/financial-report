import openReportPeriodModal from "./services/openReportPeriodModal.js";

var reportPeriodHander = async () => {
  var button = document.getElementById("period-button");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    await openReportPeriodModal();
  });
};

reportPeriodHander();
