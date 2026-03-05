import getTaxParams from "./getTaxParams.js";
import sendNewTaxParam from "./sendNewTaxParam.js";
import getSelectedTaxYear from "./getSelectedTaxYear.js";

var taxRateHandler = async () => {
  var input = document.getElementById("tax-rate");

  var radioButton = document.getElementById("recalculate-all-reports-tax-amount");

  var button = document.getElementById("tax-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = await getSelectedTaxYear();
    var taxParams = await getTaxParams();

    var yearTaxParams = taxParams.find((date) => date.year == selectedYear);
    var currentTaxRate = yearTaxParams.taxRate;
    var reportsNeedRecalculation = radioButton.checked;
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

    var success = await sendNewTaxParam(selectedYear, reportsNeedRecalculation, yearTaxParams, { taxRate: newTaxRate });

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
