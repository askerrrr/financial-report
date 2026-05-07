var button = document.getElementById("download-skus-metrics");

var downloadSkusMetricsFileButtonHandler = () =>
  (button.onclick = async () => {
    var url = "/goods/metrics/download";
    var res = await fetch(url);
    var blob = await res.blob();
    var downloadUrl = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = downloadUrl;
    var fileName = "Детализация по товарам";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  });

export default downloadSkusMetricsFileButtonHandler;
