var { FormDataError } = require("../../../customError");

var checkLogin = async (login) => {
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

  var regExp = /[a-zA-Z0-9]/gi

  var result = login.match(regExp)

  if (result.length !== login.length) {
    throw new FormDataError("Логин должен содержать только латинские буквы или цифры");
  }

  return true;
};

module.exports = checkLogin