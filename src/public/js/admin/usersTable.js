import createTdElement from "../report/table/services/createTdElement.js";

var usersTable = (users) => {
  var tableBody = document.getElementById("tbody");

  for (var user of users) {
    if (user.role !== "admin") {
      var loginTdElement = createTdElement(user.login);
      var userIdTdElement = createTdElement(user.userId);
      var registeredAtTdElem = createTdElement(user.registeredAt);

      var tableRow = document.createElement("tr");

      tableRow.append(userIdTdElement, loginTdElement, registeredAtTdElem);
      tableBody.append(tableRow);
    }
  }
};

export default usersTable;
