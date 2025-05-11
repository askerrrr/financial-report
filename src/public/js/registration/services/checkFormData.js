var checkPasswdLength = async (pwd) => pwd.length >= 4 && pwd.length < 20;

var checkLoginLength = async (login) => login.length >= 3 && login.length < 20;

var checkLoginSimbols = async (login) => {
  var loginWithoutNums = login.split("").filter((i) => !+i);

  return loginWithoutNums.every(
    (i) => i.charCodeAt() > 96 && i.charCodeAt() < 123
  );
};

var checkFormData = async ({ login, passwd }) => {
  var validLoginLength = await checkLoginLength(login);

  if (!validLoginLength) {
    alert("Логин должен быть больше или равен 3 и меньше 20 символов");

    return;
  }

  var validLogin = await checkLoginSimbols(login);

  if (!validLogin) {
    alert("Логин может сожержать только буквы латинского алфавита или цифры");

    return;
  }

  var validPasswd = await checkPasswdLength(passwd);

  if (!validPasswd) {
    alert("Пароль должен быть больше или равен 4 и меньше 20 символов");

    return;
  }

  return true;
};

export default checkFormData;
