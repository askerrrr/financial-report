import { channel } from "../index.js";
import { errorLogger } from "../../../logger.js";

var routingKey = "longrange";
var exchangeName = "report-loader";

export var longRangeReportProducer = async ({
  userId,
  dateFrom,
  dateTo,
  needToLoadAllReports,
}) => {
  var success = true;

  try {
    await channel.publish(
      exchangeName,
      routingKey,
      { userId, dateFrom, dateTo, needToLoadAllReports },
      { persistent: true },
    );
  } catch (err) {
    errorLogger.warn({ err });
    success = false;
  }

  return { success };
};
