var createLinkToTheReport = async (reportId) => {
  var button = document.createElement("button");
  var form = document.createElement("form");

  button.append("Открыть отчет");

  form.append(button);
  form.action = "/reports/" + reportId;

  return form;
};

export default createLinkToTheReport;
