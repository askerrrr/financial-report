var getReportsDto = async (reports) => {
  var data = [];

  for (var report of reports) {
    data.push({
      id: report.id,
      date: report.date,
      period: report.period ?? "",
    });
  }

  return data;  
};
