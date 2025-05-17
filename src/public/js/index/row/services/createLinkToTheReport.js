var button = document.createElement("button");
var form = document.createElement("form");

var createLinkToTheReport = async (id, reportCreationDate) => {
  button.append(reportCreationDate);

  form.append(button);
  form.action = "/reports/" + id;

  return form;
};

export default createLinkToTheReport;
