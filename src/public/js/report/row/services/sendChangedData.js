import getCookieByName from "../../../index/services/getCookieByName.js";

var userId = await getCookieByName("userId");
var reportId = await getCookieByName("reportId");

var url = "/reports/" + userId + "/" + reportId;

var sendChangedData = async (data, index, fieldName) => {
  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ data, index, fieldName }),
    headers: { "Content-Type": "application/json" },
  });

  return res.status;
};

export default sendChangedData;
