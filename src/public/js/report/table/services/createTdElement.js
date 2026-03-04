var createTdElement = (data, fieldName, index, className = "") => {
  var td = document.createElement("td");
  td.className = className;

  if (fieldName && index !== null && index !== undefined) {
    td.id = [fieldName, index].join("-");
  }

  if (fieldName && typeof index !== "number") {
    td.id = fieldName;
  }

  td.append(data ?? "");

  return td;
};

export default createTdElement;
