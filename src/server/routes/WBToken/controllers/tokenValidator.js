import parseJwt from "../services/parseJwt.js";
import isPresumablyJwtToken from "../services/isPresumablyJwtToken.js";

var tokenValidator = async (req, res, next) => {
  var token = req.body.token;

  if (!token) {
    return res.sendStatus(400);
  }

  if (!isPresumablyJwtToken(token)) {
    return res.sendStatus(400);
  }

  var currentTimestamp = new Date(Date.now() + 3 * 60 * 60).getTime();
  var options = { method: "GET", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } };

  var tokenAuthFailed = Promise.all([
    fetch("https://advert-api.wildberries.ru/ping", options),
    fetch("https://statistics-api.wildberries.ru/ping", options),
    fetch("https://seller-analytics-api.wildberries.ru/ping", options),
    fetch("https://discounts-prices-api.wildberries.ru/ping", options),
  ]).then((responses) => responses.find((res) => res.status !== 200));

  var parsedToken = parseJwt(token);
  var tokenIsExpired = parsedToken?.exp * 1000 >= currentTimestamp;

  if (tokenAuthFailed || tokenIsExpired) {
    return res.sendStatus(400);
  }

  next();
};
export default tokenValidator;
