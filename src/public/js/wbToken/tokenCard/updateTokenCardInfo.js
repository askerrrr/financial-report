export var updateTokenCardInfo = (token) => {
  var {
    addedAt,
    lastUsed,
    daysLeft,
    expiredToday,
    isExpired,
    validUntil,
    type,
  } = token;

  var addedAtElem = document.getElementById("added-at-" + type);
  addedAtElem.textContent = addedAt;

  var lastUsedElem = document.getElementById("last-used-" + type);
  lastUsedElem.textContent = lastUsed;

  var daysLeftElem = document.getElementById("days-left-" + type);
  daysLeftElem.textContent = daysLeft;

  var isExpiredElem = document.getElementById("is-expired-" + type);
  isExpiredElem.textContent = isExpired;

  var expiredTodayElem = document.getElementById("expired-today-" + type);
  expiredTodayElem.textContent = expiredToday;

  var validUntilElem = document.getElementById("valid-until-" + type);
  validUntilElem.textContent = validUntil;
};
