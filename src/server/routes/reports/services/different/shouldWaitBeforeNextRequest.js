var oneMinuteMs = 60 * 1000;

var shouldWaitBeforeNextRequest = (lastReportRequestTimestamp) => {
  var nextRequestDelayMs = 0;

  if (lastReportRequestTimestamp === 0) {
    return { nextRequestDelayMs };
  }

  var currentTimeMs = new Date().getTime();
  var difference = currentTimeMs - lastReportRequestTimestamp;
  var hasMinutePassed = difference > oneMinuteMs;

  if (hasMinutePassed) {
    return { nextRequestDelayMs };
  }

  return { nextRequestDelayMs: difference };
};

module.exports = shouldWaitBeforeNextRequest;
