import argon2 from "argon2";
import dbUtils from "../../../database/modelsUtil/index.js";

var { getUserByLogin } = dbUtils.userModelUtils;

var validateUser = async (login, pwd) => {
  var user = await getUserByLogin(login);

  if (!user) {
    return { userNotExist: true, credentialInvalid: false, userId: null };
  }

  var credentialInvalid = !(await argon2.verify(user.passwd, pwd));

  return { credentialInvalid, userNotExist: false, userId: user.userId };
};

export default validateUser;
