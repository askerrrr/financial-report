var removeTokenButton = document.getElementById("remove-token-button");

var url = "/wbtoken";
var userId = document.cookie.split("=")[1];

var WBTokenRemoveButtonHandler = () =>
  removeTokenButton.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить токен?");

    if (confirmed) {
      try {
        var res = await fetch(url, { method: "DELETE", body: JSON.stringify({ userId }), headers: { "Content-Type": "application/json" } });

        if (res.status === 200) {
          alert("Токен успешно удален");
          return;
        } else {
          alert("Не удалось удалить токен");
          return;
        }
      } catch (e) {
        alert("Произошла ошибка при попытке удалить токен...");
        return;
      }

      return;
    }
  });

export default WBTokenRemoveButtonHandler;
