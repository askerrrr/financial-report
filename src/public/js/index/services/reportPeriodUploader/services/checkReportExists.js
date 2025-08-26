var checkReportExists = async (dateFrom, dateTo) => {
  var url = "/reports/check-report-exists/" + dateFrom + "/" + dateTo;

  var res = await fetch(url);

  if (res.status === 404) {
    return;
  }

  var { msg } = await res.json();

  alert(msg);

  return true;
};

export default checkReportExists;
