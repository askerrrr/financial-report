var tokenValidator = async (req, res, next) => {
  var { token } = req.body;

  var tokenIsValid = Promise.all([
    fetch("https://advert-api.wildberries.ru/ping", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    }),
    fetch("https://statistics-api.wildberries.ru/ping", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    }),
    fetch("https://seller-analytics-api.wildberries.ru/ping", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    }),
    fetch("https://discounts-prices-api.wildberries.ru/ping", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    }),
  ]).then((responses) => responses.every((res) => res.status === 200));

  if (!tokenIsValid) {
    return res.sendStatus(400);
  }

  next();
};
export default tokenValidator;
