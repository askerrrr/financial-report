var createRowForReport = async () => {
  var res = await getReportData();

  var data = await res.json();

  console.log(data);
};

createRowForReport();
