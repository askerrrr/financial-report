var years = [2025, 2024];

var taxYearSelectHandler = async () => {
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
