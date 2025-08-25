import checkFormData from "./checkFormData.js";
import sendRegistationData from "./sendRegistationData.js";

var registrationFormHandler = async () =>
  (document.getElementById("registration-form").onsubmit = async (e) => {
    e.preventDefault();

    var login = document.getElementById("login").value;
    var passwd = document.getElementById("passwd").value;

    var validData = await checkFormData(login, passwd);

    if (!validData) {
      return;
    }

    var redirectUrl = await sendRegistationData(login, passwd);

    if (!redirectUrl) {
      return;
    }

    window.location.href = redirectUrl;
  });

registrationFormHandler();
