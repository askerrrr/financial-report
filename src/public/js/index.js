var getReportData = async () => {
  try {
    var res = await fetch("/api");

    var json = await res.json();

    console.log("data:", json);
  } catch (e) {
    console.log("e: ", e);
  }
};

getReportData();
