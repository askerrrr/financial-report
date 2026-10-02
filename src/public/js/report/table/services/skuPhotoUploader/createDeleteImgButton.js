var createDeleteImgButton = (userId, skuName) => {
  var button = document.createElement("button");

  button.id = "delete-img-button-" + skuName;
  button.className = "delete-img-button";
  button.style.display = "none";

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var objectKey = userId + ";" + skuName;

    var res = await fetch("/report/image/", {
      method: "DELETE",
      body: JSON.stringify({ objectKey }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 204) {
      var imgTadId = "img-" + skuName;
      var img = document.getElementById(imgTadId);
      img.src = null;

      button.style.display = "none";

      alert("Фото успешно удалено");
    } else {
      alert("Не удалось удалить фото");
    }
  });

  return button;
};

export default createDeleteImgButton;
