var updateTotalsTableFields = (totals) => {
  for (var fieldName of Object.keys(totals)) {
    var elem = document.getElementById(fieldName);

    if (elem) {
      elem.textContent = totals[fieldName];

      if (totals[fieldName] < 0) {
        elem.style.color = "red";
      } else {
        elem.style.color = "#04ff00";
      }
    }
  }
};

export default updateTotalsTableFields;
