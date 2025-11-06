var sendUploadFile = async (file) => {
  var userId = document.cookie.split("=")[1];
  var url = "/goods/upload-prices-discount-file/" + userId;

  var res = await fetch(url, {
    method: "POST",
    body: file,
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
  var button = document.getElementById("upload-weekly-prices-and-discounts-file");
  var input = document.getElementById("input-field");

  button.onclick = async (e) => {
    e.preventDefault();
    input.click();

    input.onchange = async () => {
      var uploadFormData = new FormData();
      if (input.files.length > 1) {
        alert("Одновременно можно загрузить не больше 1 файла");
        return;
      }

      uploadFormData.append("file", input.files[0]);
      await sendUploadFile(uploadFormData);
    };
  };
};

export default fileUploadHandler;
