var updateTotalsTableFields = async (data) => {
  for (var elem of Object.keys(data)) {
    var totalField = document.getElementById(elem);
    totalField.textContent = data[elem];

    if (data[elem] < 0) {
      totalField.style.color = "red";
    } else {
      totalField.style.color = "#04ff00";
    }
  }
};

export default updateTotalsTableFields;
