var getYears = async () => {
  var res = await fetch("/tax_params/years");

  var { years } = await res.json();

  return years;
};

var taxYearSelectHandler = async () => {
  var years = await getYears();

  var selectsElem = document.getElementsByName("tax-year");

  selectsElem.forEach((select) => {
    years.forEach((year) => {
      var optionElem = document.createElement("option");
      optionElem.text = year;
      optionElem.value = year;

      select.append(optionElem);
    });
  });
};

export default taxYearSelectHandler;
