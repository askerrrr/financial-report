import checkTokenExistService from "../services/checkTokenExist.js";

var tokenMissingMsg = "Отсутствует токен личного кабинета WB";
var tokenExpiryMsg = "Истек срок действия токена личного кабинета WB";

var checkTokenExistsController = async (req, res, next) => {
  var { userId, requiredTokenType } = req.body;

  var { isExpired, tokenIsMissing, token } = await checkTokenExistService(
    userId,
    requiredTokenType,
  );

  if (isExpired) {
    return res.json({ errorText: tokenExpiryMsg });
  }

  if (tokenIsMissing) {
    if (requiredTokenType === "read") {
      tokenMissingMsg += "\nТип токена: Только чтение";
    }

    return res.json({ errorText: tokenMissingMsg });
  }

  req.body.wbtoken = token;

  next();
};

export default checkTokenExistsController;
