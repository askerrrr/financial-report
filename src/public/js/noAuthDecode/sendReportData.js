var sendReportData = async (dateFrom, dateTo, token, taxRate = 6) => {
  var res = await fetch("/no-auth-decode/", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, token, taxRate }),
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
