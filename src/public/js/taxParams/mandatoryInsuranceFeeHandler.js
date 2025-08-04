import getSelectedTaxYear from "./getSelectedTaxYear.js";

var sendMandatoryInsuranceFee = async (mandatoryInsuranceFee, year) => {
  var res = await fetch("/tax_params/mandatory-insurance-premiums", {
    method: "POST",
    body: JSON.stringify({ mandatoryInsuranceFee, year }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var mandatoryInsuranceFeeHandler = async (currentMandatoryInsuranceFee) => {
  var input = document.getElementById("mandatory-insurance-premiums");
  input.placeholder =
    "сейчас сумма равна " + currentMandatoryInsuranceFee + "р.";

  var button = document.getElementById("mandatory-insurance-premiums-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = await getSelectedTaxYear();

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

    var successChange = await sendMandatoryInsuranceFee(
      newMandatoryInsuranceFee,
      selectedYear
    );

    if (successChange) {
      return alert("Сумма обязательных страховых взносов установлена");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsuranceFeeHandler;
