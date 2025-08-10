var sendAuthData = async (data) => {
  var res = await fetch("/auth/check", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

var authFormHandler = async () => {
  var form = document.getElementById("auth-form");

  form.onsubmit = async (e) => {
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
  };
};

authFormHandler();
