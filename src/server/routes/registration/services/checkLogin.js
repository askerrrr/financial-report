var { FormDataError } = require("../../../customError");

var checkLogin = async (login) => {
  console.log({login})

  if(!login){
    throw new FormDataError('Логин не может быть пустым')
  }

  login = login.trim();

  if (login.length < 2) {
    throw new FormDataError("Минимальная длина логина равна 2");
  }

  if (login.length > 20) {
    throw new FormDataError("Максимальная длина логина равна 20");
  }

  var loginWithoutNums = login.split("").filter((i) => !+i);

  var loginContainsValidChar = loginWithoutNums.every((i) => i.charCodeAt() > 96 && i.charCodeAt() < 123);

  if (!loginContainsValidChar) {
    throw new FormDataError("Логин должен содержать только латинские буквы или цифры");
  }

  return true;
};

module.exports = checkLogin