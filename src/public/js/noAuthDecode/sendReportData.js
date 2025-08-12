var sendReportData = async (dateFrom, dateTo, token) => {
  var res = await fetch("url", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, token }),
    headers: { "Content-Type": "application/json" },
  });

  var result = await res.json();

  if (!res.ok) {
    return alert(result);
  }

  return result;
};

export default sendReportData;
