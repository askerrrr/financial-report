import sendAuthData from "./sendAuthData.js";

var authFormHandler = async () => {
  try {
    var form = document.getElementById("auth-form");

    return form.addEventListener("submit", async (e) => {
      e.preventDefault();

      var formData = {};

      new FormData(form).forEach((value, key) => {
        formData[key] = value;
      });

      var res = await sendAuthData(formData);

      if (res.status == 404) {
        return alert(`Нет пользователя c ником  ${formData.login}`);
      }

      if (res.status == 403) {
        return alert("Введены неправильные данные");
      }

      var { redirectUrl } = await res.json();

      window.location.href = redirectUrl;
    });
  } catch (e) {
    console.log("auth error: ", e);
  }
};

authFormHandler();
