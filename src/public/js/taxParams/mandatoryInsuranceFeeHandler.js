import getTaxParams from "./getTaxParams.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";

var sendMandatoryInsuranceFee = async (mandatoryInsuranceFee, year) => {
  var res = await fetch("/tax_params/mandatory-insurance-premiums", {
    method: "POST",
    body: JSON.stringify({ mandatoryInsuranceFee, year }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var mandatoryInsuranceFeeHandler = async () => {
  var input = document.getElementById("mandatory-insurance-premiums");

  var button = document.getElementById("mandatory-insurance-premiums-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = await getSelectedTaxYear();
    var taxParams = await getTaxParams();

    var yearTaxParams = taxParams.find((date) => date.year == selectedYear);
    var currentMandatoryInsuranceFee = yearTaxParams.mandatoryInsuranceFee;
    var newMandatoryInsuranceFee = +input.value;

    if (
      typeof newMandatoryInsuranceFee === "number" &&
      isNaN(newMandatoryInsuranceFee)
    ) {
      return alert("Введите числовое значение");
    }

    if (newMandatoryInsuranceFee === currentMandatoryInsuranceFee) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (newMandatoryInsuranceFee < 0 && newMandatoryInsuranceFee > 1e5) {
      return alert("Недопустимое значение");
    }

    var success = await sendMandatoryInsuranceFee(
      newMandatoryInsuranceFee,
      selectedYear
    );

    input.value = "";

    if (success) {
      input.placeholder =
        "сейчас сумма равна " + newMandatoryInsuranceFee + "р.";

      var mandatoryInsuranceFeeTdElement = document.getElementById(
        "mandatoryInsuranceFee-" + selectedYear
      );

      mandatoryInsuranceFeeTdElement.textContent = newMandatoryInsuranceFee;

      return alert("Сумма обязательных страховых взносов установлена");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsuranceFeeHandler;
