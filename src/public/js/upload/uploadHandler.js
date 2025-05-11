var sendUploadFile = async (files) => {
  var res = await fetch("/upload/file", {
    method: "POST",
    body: files,
  });

  return res;
};

var uploadHandler = async () => {
  try {
    var uploadInput = document.getElementById("fileinput");

    return uploadInput.addEventListener("change", async (e) => {
      e.preventDefault();

      var uploadFormData = new FormData();

      for (var file of uploadInput.files) {
        uploadFormData.append("file", file);
      }
      var res = await sendUploadFile(uploadFormData);

      if (!res.ok) {
        return alert("Произошла ошибка при загрузке документа");
      }

      var { msg } = await res.json();

      alert(msg);
    });
  } catch (e) {
    alert("uploadHandlerError: " + e);
    console.log("uploadHandlerError: ", e);
  }
};

uploadHandler();
