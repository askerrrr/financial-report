import { channel } from "../index.js";
import { errorLogger } from "../../../logger.js";

var routingKey = "abandoned";
var exchangeName = "report-loader";

export var abandonedReportProducer = async (userId) => {
  channel
    .publish(exchangeName, routingKey, { userId }, { persistent: true })
    .catch((err) => errorLogger.fatal({ userId, routingKey, err }));
};
