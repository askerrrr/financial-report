import validateTokenService from "../services/validateToken.js";

var tokenValidatorController = async (req, res, next) => {
  var { token } = req.body;

  var { errorText, tokenPayload, type, categories } =
    await validateTokenService(token);

  if (errorText) {
    return res.status(400).json({ errorText });
  }

  req.body.type = type;
  req.body.categories = categories;
  req.body.tokenPayload = tokenPayload;

  next();
};

export default tokenValidatorController;
