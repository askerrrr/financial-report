var createTdElement = async (data) => {
  var td = document.createElement("td");

  td.append(data ?? "");

  return td;
};

export default createTdElement;
