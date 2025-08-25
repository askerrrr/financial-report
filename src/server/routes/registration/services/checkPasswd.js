var { FormDataError } = require("../../../customError");

var checkPasswd = async (pwd) => {
if(!pwd){
    throw new FormDataError('Пароль не может быть пустым')
  }

  pwd = pwd.trim();

  var pwdIsEmpty = pwd.length === 0;

  if (pwdIsEmpty) {
    throw new FormDataError("Пароль не должен содержать пробелов");
  }

  if (pwd.length < 4) {
    throw new FormDataError("Длина пароля должна быть больше 3");
  }

  if (pwd.length > 21) {
    throw new FormDataError("Длина пароля должна быть меньше 21");
  }

  return true;
};

module.exports = checkPasswd