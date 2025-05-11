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
    return document
      .getElementById("reg-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        var formData = {};

        new FormData(form).forEach((value, key) => {
          formData[key] = value;
        });

        var res = await sendRegistationData(formData);

        var { redirectUrl } = await res.json();

        window.location.href = redirectUrl;
      });
  } catch (e) {}
};

registrationFormHandler();
