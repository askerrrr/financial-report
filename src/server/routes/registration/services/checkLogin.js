var { FormDataError } = require("../../../customError");

var checkLogin = async (login) => {
  if(!login){
    throw new FormDataError('Логин не может быть пустым', login)
  }

  login = login.trim();

  if (login.length < 2) {
    throw new FormDataError("Минимальная длина логина равна 2", login);
  }

  if (login.length > 20) {
    throw new FormDataError("Максимальная длина логина равна 20", login);
  }

  var regExp = /[a-zA-Z0-9]/gi

  var result = login.match(regExp)

  if (result.length !== login.length) {
    throw new FormDataError("Логин должен содержать только латинские буквы или цифры", login);
  }

  return true;
};

module.exports = checkLogin