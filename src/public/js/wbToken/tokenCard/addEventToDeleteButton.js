import { removeTokenCard } from "./removeTokenCard.js";

export var addEventToDeleteButton = (
  userId,
  tokenType,
  ending,
  url = "/wbtoken/",
) => {
  var btnId = "btn-delete" + ending;
  var deleteBtn = document.getElementById(btnId);

  deleteBtn.addEventListener("click", async () => {
    console.log("delete click" + ending);

    var confirmed = confirm("Удалить токен ?");

    if (confirmed) {
      try {
        var res = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify({ userId, tokenType }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          removeTokenCard(ending);

          alert("Токен успешно удален");
        } else {
          alert("Не удалось удалить токен");
        }
      } catch (e) {
        alert("Произошла ошибка при попытке удалить токен...");
      }
    }
  });
};
