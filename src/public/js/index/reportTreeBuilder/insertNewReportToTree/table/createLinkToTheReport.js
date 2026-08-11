var splitedPathName = window.location.pathname.split("/");

var createLinkToTheReport = (reportId) => {
  var button = document.createElement("button");
  var form = document.createElement("form");

  button.append("Открыть отчет");

  form.append(button);

  var url = splitedPathName.includes("user") ? `/admin/user/${splitedPathName.at(-1)}/report/${reportId}` : "/report/" + reportId;

  form.action = url;

  return form;
};

export default createLinkToTheReport;
