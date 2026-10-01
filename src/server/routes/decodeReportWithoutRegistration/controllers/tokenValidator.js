import validateTokenService from "../../WBToken/services/validateToken.js";

var requiredTokenType = "read";
var invalidTokenTypeMsg =
  "Неправильный тип токена.\n\nОжидаемый тип токена - Только Чтение.\n\nНеобходимые категории:\n- Финансы\n- Аналитика\n- Продвижение";

var tokenValidatorController = async (req, res, next) => {
  var { token } = req.body;

  var { errorText, type } = await validateTokenService(token);

  if (type !== requiredTokenType) {
    errorText = invalidTokenTypeMsg;
  }

  if (errorText) {
    return res.json({ errorText, report: {} });
  }

  next();
};
export default tokenValidatorController;
