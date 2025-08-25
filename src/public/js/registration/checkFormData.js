var checkPasswd = async (pwd) => {
  pwd = pwd.trim();

  var pwdIsEmpty = pwd.length === 0;

  if (pwdIsEmpty) {
    alert("Пароль не должен содержать пробелов");
    return;
  }

  if (pwd.length < 4) {
    alert("Длина пароля должна быть больше 3");
    return;
  }

  if (pwd.length > 21) {
    alert("Длина пароля должна быть меньше 21");
    return;
  }

  return true;
};

var checkLogin = async (login) => {
  login = login.trim();

  if (login.length < 2) {
    alert("Минимальная длина логина равна 2");
    return;
  }

  if (login.length > 20) {
    alert("Максимальная длина логина равна 20");
    return;
  }

  var loginWithoutNums = login.split("").filter((i) => !+i);

  var loginContainsValidChar = loginWithoutNums.every((i) => i.charCodeAt() > 96 && i.charCodeAt() < 123);

  if (!loginContainsValidChar) {
    alert("Логин должен содержать только латинские буквы или цифры");
    return;
  }

  return true;
};

var checkFormData = async (login, passwd) => {
  var loginIsValid = await checkLogin(login);

  if (!loginIsValid) {
    document.getElementById("login").value = "";
    return;
  }

  var passwdIsValid = await checkPasswd(passwd);

  if (!passwdIsValid) {
    document.getElementById("passwd").value = "";
    return;
  }

  return true;
};

export default checkFormData;
