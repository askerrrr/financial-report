import getCookieByName from "../../../index/services/getCookieByName.js";

var userId = await getCookieByName("userId");
var reportId = window.location.pathname.split("/").at(-1); // await getCookieByName("reportId");

var sendChangedData = async (value, index, fieldName, url) => {
  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId, reportId, value, index, fieldName }),
    headers: { "Content-Type": "application/json" },
  });

  return res.status;
};

export default sendChangedData;
