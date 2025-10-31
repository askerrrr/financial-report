var sendUploadFile = async (files) => {
  var url = "/goods/upload-prices-discount-file";

  var res = await fetch(url, {
    method: "POST",
    body: files,
  });

  if (!res.ok) {
    alert("Произошла ошибка при загрузке документа");
    return;
  }

  var { msg } = await res.json();
  alert(msg);
  return;
};

var fileUploadHandler = async () => {
  var inputField = document.getElementById("input-field");

  inputField.onchange = async (e) => {
    e.preventDefault();
    var uploadFormData = new FormData();
    if (inputField.files.length > 1) {
      alert("Одновременно можно загрузить не больше 1 файла");
      return;
    }
    uploadFormData.append("file", inputField.files[0]);
    await sendUploadFile(uploadFormData);
  };
};

export default fileUploadHandler;
