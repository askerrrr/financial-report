import getTaxParams from "./getTaxParams.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";

var sendPercent = async (percent, recalculate, year) => {
  var res = await fetch("/tax_params/insurance-fee-percentage", {
    method: "POST",
    body: JSON.stringify({ percent, recalculate, year }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var insuranceFeePercentageHandler = async () => {
  var input = document.getElementById("insurance-fee-percentage");

  var radioButton = document.getElementById(
    "recalculate-all-reports-insurance-fee-percentage"
  );

  var button = document.getElementById("insurance-fee-percentage-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = await getSelectedTaxYear();
    var taxParams = await getTaxParams();

    var yearTaxParams = taxParams.find((date) => date.year == selectedYear);
    var currentPercent = yearTaxParams.insuranceFeePercentage;
    var recalculate = radioButton.checked;
    var newPercent = +input.value;

    if (typeof newPercent === "number" && isNaN(newPercent)) {
      return alert("Введите числовое значение");
    }

    if (newPercent === currentPercent) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (newPercent <= 0 && newPercent >= 100) {
      return alert("Недопустимое значение");
    }

    var success = await sendPercent(newPercent, recalculate, selectedYear);

    input.value = "";

    if (success) {
      input.placeholder = "сейчас процент равен " + newPercent;

      var insuranceFeePercentageTdElement = document.getElementById(
        "insuranceFeePercentage-" + selectedYear
      );

      insuranceFeePercentageTdElement.textContent = newPercent;

      return alert("Процент успешно установлен");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default insuranceFeePercentageHandler;
