import { insertNewReportToTree } from "../reportTreeBuilder/index.js";
import createNewReportsModalWindow from "./createNewReportsModalWindow.js";

var url = "/report/files";
var maxReportFilesCount = 15;
var allowedFileMimeTypes = ["application/zip", "application/x-zip-compressed", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

var reportFileUploadFormHandler = (userId) => {
  var uploadInput = document.getElementById("fileinput");

  return uploadInput.addEventListener("change", async (e) => {
    e.preventDefault();

    var count = 1;
    var formData = new FormData();
    formData.append("userId", userId);

    for (var file of uploadInput.files) {
      if (allowedFileMimeTypes.includes(file.type) && count <= maxReportFilesCount) {
        formData.append("file", file);
        count++;
      }
    }

    var res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      var { reportsData } = await res.json();

      if (reportsData.length) {
        createNewReportsModalWindow(reportsData);

        for (var report of reportsData) {
          insertNewReportToTree(report);
        }
      } else {
        alert("Отчёты не были добавлены");
      }
    } else {
      return alert("Произошла ошибка при загрузке документов");
    }
  });
};

export default reportFileUploadFormHandler;
