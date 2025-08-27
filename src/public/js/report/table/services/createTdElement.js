var createTdElement = async (data, fieldName, index, className = "") => {
  var td = document.createElement("td");
  td.className = className;

  if (fieldName && index) {
    td.id = [fieldName, index].join("-");
  }

  if (fieldName && !index) {
    td.id = fieldName;
  }

  td.append(data ?? "");

  return td;
};

export default createTdElement;
