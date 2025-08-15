var deleteReportTables = async () => {
  var skuTrElements = document.getElementById("skus-tbody").childNodes;

  if (skuTrElements.length === 0) {
    console.log({ skuTrElements });
    return;
  }

  for (var elem of skuTrElements) {
    elem.remove();
  }

  document.getElementById("skus-table").style.display = "none";
  document.getElementById("totals-table").style.display = "none";
  document.getElementById("total-tbody").childNodes[0].remove();
  document.getElementById("download-report-as-xlsx-button").style.display = "none";
};

export default deleteReportTables;
