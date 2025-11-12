var createTdElement = (data, id, idPostfix) => {
  var td = document.createElement("td");
  td.append(data);

  if (id) {
    td.id = id + "-" + idPostfix;
  }

  return td;
};

export default createTdElement;
