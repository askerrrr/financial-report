var updateTotalsTableFields = (year, totals) => {
  for (var fieldName of Object.keys(totals)) {
    var eleId = fieldName + "-" + year;
    var elem = document.getElementById(eleId);

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
