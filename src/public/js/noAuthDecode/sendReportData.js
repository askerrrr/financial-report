var sendReportData = async (dateFrom, dateTo, token) => {
  var res = await fetch("/no-auth-decode/", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, token }),
    headers: { "Content-Type": "application/json" },
  });

  var result = await res.json();

  if (!res.ok) {
    alert(result.msg);
    return;
  }

  return result.redirectUrl;
};

export default sendReportData;
