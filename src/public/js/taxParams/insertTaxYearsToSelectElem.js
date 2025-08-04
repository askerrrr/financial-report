var insertTaxYearsToSelectElem = async () => {
  var years = await getYears();

  var selectsElem = document.getElementById("tax-year");

  selectsElem.forEach((select) => {
    years.forEach((year) => {
      var optionElem = document.createElement("option");
      optionElem.text = year;
      optionElem.value = year;

      select.append(optionElem);
    });
  });
};

export default insertTaxYearsToSelectElem;
