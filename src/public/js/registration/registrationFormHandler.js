import checkFormData from "./services/checkFormData.js";

var sendRegistationData = async (data) => {
  var res = await fetch("/reg/new", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

var registrationFormHandler = async () => {
  try {
    var form = document.getElementById("reg-form");

    return form.addEventListener("submit", async (e) => {
      e.preventDefault();

      var formData = {};

      new FormData(form).forEach((value, key) => {
        formData[key] = value;
      });

      var validData = await checkFormData(formData);

      if (!validData) {
        return;
      }

      var res = await sendRegistationData(formData);

      if (res.status == 409) {
        return alert(`Пользователь с ником ${formData.login} уже существует`);
      }

      var { redirectUrl } = await res.json();

      window.location.href = redirectUrl;
    });
  } catch (e) {}
};

registrationFormHandler();
