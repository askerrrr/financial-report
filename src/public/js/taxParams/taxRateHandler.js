import getTaxParams from "./getTaxParams.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";

var sendTaxRate = async (taxRate, recalculate, year) => {
  var res = await fetch("/tax_params/taxrate", {
    method: "POST",
    body: JSON.stringify({ taxRate, recalculate, year }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var taxRateHandler = async () => {
  var input = document.getElementById("tax-rate");

  var radioButton = document.getElementById(
    "recalculate-all-reports-tax-amount"
  );

  var button = document.getElementById("tax-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = await getSelectedTaxYear();
    var taxParams = await getTaxParams();

    var yearTaxParams = taxParams.find((date) => date.year == selectedYear);
    var currentTaxRate = yearTaxParams.taxRate;
    var recalculate = radioButton.checked;
    var newTaxRate = +input.value;

    if (typeof newTaxRate === "number" && isNaN(newTaxRate)) {
      return alert("Введите числовое значение");
    }

    if (newTaxRate === currentTaxRate) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (newTaxRate < 1 || newTaxRate > 15) {
      return alert("Недопустимое значение");
    }

    var success = await sendTaxRate(newTaxRate, recalculate, selectedYear);

    input.value = "";

    if (success) {
      input.placeholder = "сейчас процент равен " + newTaxRate;

      var taxRateTdElement = document.getElementById("taxRate-" + selectedYear);
      taxRateTdElement.textContent = newTaxRate;

      return alert("Изменение успешно применено");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default taxRateHandler;
