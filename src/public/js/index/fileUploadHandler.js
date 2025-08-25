var sendUploadFile = async (files, url) => {
  var res = await fetch(url, {
    method: "POST",
    body: files,
  });

  return res;
};

var fileUploadHandler = async () => {
  var uploadInput = document.getElementById("fileinput");

  return uploadInput.addEventListener("change", async (e) => {
    e.preventDefault();

    var uploadFormData = new FormData();

    if (uploadInput.files.length > 10) {
      return alert("Одновременно можно загрузить не больше 10 файлов");
    }

    for (var file of uploadInput.files) {
      uploadFormData.append("file", file);
    }

    var uploadUrl =
      uploadInput.files.length == 1
        ? "/reports/upload/file"
        : "/reports/upload/files";

    var res = await sendUploadFile(uploadFormData, uploadUrl);

    if (!res.ok) {
      return alert("Произошла ошибка при загрузке документа");
    }

    var { msg } = await res.json();

    alert(msg);
  });
};

export default fileUploadHandler;
