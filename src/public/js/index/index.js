var getReportsData = async () => {
  var res = await fetch("/api");

  return res;
};

var showReportsTable = async () => {
  var res = await getReportsData();

  var json = await res.json();
};

showReportsTable();
