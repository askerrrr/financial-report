var sendReportData = async (dateFrom, dateTo, token, taxRate) => {
  var res = await fetch("/decode-report-without-auth/", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, token, taxRate }),
    headers: { "Content-Type": "application/json" },
  });

  var data = await res.json();

  if (!res.ok) {
    throw new Error(res.text);
  }

  return data;
};

export default sendReportData;
