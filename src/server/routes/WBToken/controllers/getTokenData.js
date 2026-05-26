import parseJwt from "../services/parseJwt.js";
import getWBTokenByUserId from "../../../database/collections/tokens/services/getWBTokenByUserId.js";

var millisecondsInOneSec = 1000;
var millisecondsInDay = 86_400_000;
var monthList = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

var getTokenData = async (req, res, next) => {
  var userId = req.params.userId;

  if (!userId) {
    return res.sendStatus(400);
  }

  var { token } = await getWBTokenByUserId(userId);

  if (!token.length) {
    return res.json({ tokenIsExist: false });
  }

  var { exp, id } = parseJwt(token);

  var expInMilliseconds = exp * millisecondsInOneSec;
  var currentTimestamp = new Date(Date.now()).getTime();
  var isExpired = currentTimestamp > expInMilliseconds;

  var daysLeft;

  if (isExpired) {
    daysLeft = "-";
  } else {
    var difference = expInMilliseconds - currentTimestamp;
    var daysLeft = difference / millisecondsInDay;
    daysLeft = daysLeft.toString().split(".")[0]; //truncate days 
  }

  var currentDate = new Date(currentTimestamp).toISOString();
  var currentDateWithoutHour = currentDate.split("T")[0];

  var dateFromExp = new Date(expInMilliseconds).toISOString();
  var dateFromExpWithoutHour = dateFromExp.split("T")[0];

  var [year, monthNum, day] = dateFromExpWithoutHour.split("-");
  var monthIndex = monthNum - 1;

  var validUntil = `${day} ${monthList[monthIndex]} ${year}`;

  var expiredToday = false;

  if (dateFromExpWithoutHour === currentDateWithoutHour) {
    expiredToday = true;
  }

  return res.json({ id, daysLeft, validUntil, isExpired, expiredToday, tokenIsExist: true });
};

export default getTokenData;
