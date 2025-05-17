var button = document.createElement("button");
var form = document.createElement("form");
var td = document.createElement("td");

var createLinkToTheReport = async (id) => {
  button.append(id);

  form.append(button);
  form.action = "/reports/" + id;

  td.append(form);

  return td;
};

export default createLinkToTheReport;
