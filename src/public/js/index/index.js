var userId = document.cookie.split("=")[1];

var getReportsData = async () => await fetch("/api/" + userId);

var showReportsTable = async () => {
  var res = await getReportsData();

  var json = await res.json();
};

showReportsTable();
