import isPresumablyJwtToken from "./isPresumablyJwtToken.js";

var createSaveButton = (input, modal) => {
  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";

  saveButton.onclick = async () => {
    if (input.value.length < 1) {
      return alert("Нельзя отправить пустое поле");
    }

    var token = input.value;

    try {
      if (!isPresumablyJwtToken(token)) {
        alert("Токен не валиден");
        input.value = "";
        return;
      }

      var res = await fetch("/wbtoken", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        modal.remove();
        setTimeout(() => alert("Токен успешно сохранен"));
        return;
      } else if (res.status === 409) {
        alert("Токен совпадает с предыдущим");
        input.value = "";
        return;
      } else if (res.status === 400) {
        alert("Неправильный запрос");
        input.value = "";
        return;
      } else if (res.status === 401) {
        alert("Токен не валиден");
        input.value = "";
        return;
      } else {
        alert("Произошла ошибка при попытке сохранить токен ...");
        input.value = "";
        return;
      }
    } catch {
      alert("Что-то пошло не так ...");
      modal.remove();
      return;
    }
  };

  return saveButton;
};

export default createSaveButton;
