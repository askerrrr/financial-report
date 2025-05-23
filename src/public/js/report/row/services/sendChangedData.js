import getCookieByName from "../../../index/services/getCookieByName.js";

var userId = await getCookieByName("userId");
var reportId = window.location.pathname.split("/").at(-1); // await getCookieByName("reportId");

var url = "/reports/change";

var sendChangedData = async (data, index, fieldName) => {
  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId, reportId, data, index, fieldName }),
    headers: { "Content-Type": "application/json" },
  });

  return res.status;
};

export default sendChangedData;
