import getCurrentTaxYear from "./getCurrentTaxYear.js";

var sendTaxRate = async (taxRate, recalculate, year) => {
  var res = await fetch("/tax_params/taxrate", {
    method: "POST",
    body: JSON.stringify({ taxRate, recalculate, year }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var taxRateHandler = async (currentTaxRate) => {
  var input = document.getElementById("tax-rate");
  input.placeholder = "сейчас процент равен " + currentTaxRate;

  var radioButton = document.getElementById(
    "recalculate-all-reports-tax-amount"
  );

  var button = document.getElementById("tax-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectedYear = await getCurrentTaxYear();

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

    var successChange = await sendTaxRate(
      newTaxRate,
      recalculate,
      selectedYear
    );

    if (successChange) {
      return alert("Изменение успешно применено");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default taxRateHandler;
