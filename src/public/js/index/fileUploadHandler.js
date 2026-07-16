import { insertNewReportToTree } from "./reportTreeBuilder/index.js";

var url = "/report/files";
var maxReportFilesCount = 15;

var sendUploadFile = async (files) => {};

var fileUploadHandler = (userId) => {
  var uploadInput = document.getElementById("fileinput");

  return uploadInput.addEventListener("change", async (e) => {
    e.preventDefault();

    var formData = new FormData();

    if (uploadInput.files.length > maxReportFilesCount) {
      return alert("Максимальное количество файлов для загрузки: " + maxReportFilesCount);
    }

    formData.append("userId", userId);

    for (var file of uploadInput.files) {
      formData.append("file", file);
    }

    var res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      var { reportsData } = await res.json();

      alert("Отчётов добавлено: " + reportsData.length);
      for (var report of reportsData) {
        insertNewReportToTree(report);
      }
    } else {
      return alert("Произошла ошибка при загрузке документа");
    }
  });
};

export default fileUploadHandler;
