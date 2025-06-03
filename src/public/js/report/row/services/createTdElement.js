var createTdElement = async (data, index, fieldName) => {
  var td = document.createElement("td");

  if (index && fieldName) {
    td.id = [fieldName, index].join("-");
  }
  td.append(data ?? "");

  return td;
};

export default createTdElement;
