var updateCalculatedTableFields = async (data) => {
  var { index } = data;

  delete data.index;

  for (var elem of Object.keys(data)) {
    var elemId = [elem, index].join("-");

    document.getElementById(elemId).textContent = data[elem];
  }
};

export default updateCalculatedTableFields;
