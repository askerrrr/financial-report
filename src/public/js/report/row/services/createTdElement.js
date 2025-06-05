var createTdElement = async (data, fieldName, index) => {
  var td = document.createElement("td");

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
