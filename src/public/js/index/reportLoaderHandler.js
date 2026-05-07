import openReportPeriodModal from "./services/reportLoader/index.js";

var userId = document.cookie.split("=")[1];
var url = "/wbtoken/" + userId;

var checkWBTokenExists = async () => {
  var res = await fetch(url);
  if (res.status === 404) {
    return;
  }
  return true;
};

var reportLoaderHandler = async () =>
  (document.getElementById("period-button").onclick = async (e) => {
    e.preventDefault();
    var tokenIsExists = await checkWBTokenExists();
    if (!tokenIsExists) {
      return alert("В первую очередь нужно загрузить токен личного кабинета WB");
    }
    await openReportPeriodModal();
  });

export default reportLoaderHandler;
