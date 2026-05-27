var tokenIdTdElement = document.getElementById("token-id");
var tokenDaysLeftTdElement = document.getElementById("days-left");
var tokenLastusedTdElement = document.getElementById("last-used");
var tokenValidUntilTdElement = document.getElementById("valid-until");
var tokenIsExpiredTdElement = document.getElementById("token-is-expired");

var yes = "да";
var no = "нет";

var insertDataToTokenDataTable = (data) => {
  tokenIdTdElement.textContent = data.id;
  tokenDaysLeftTdElement.textContent = data.daysLeft;
  tokenLastusedTdElement.textContent = "-";
  tokenValidUntilTdElement.textContent = data.validUntil;
  tokenIsExpiredTdElement.textContent = data.isExpired ? yes : no;
};

var resetTokenDataTable = () => {
  tokenIdTdElement.textContent = "";
  tokenDaysLeftTdElement.textContent = "";
  tokenLastusedTdElement.textContent = "";
  tokenValidUntilTdElement.textContent = "";
  tokenIsExpiredTdElement.textContent = "";
};

export { insertDataToTokenDataTable, resetTokenDataTable };
