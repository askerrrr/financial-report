var sendPercent = async (percent, recalculate, year) => {
  var res = await fetch("/tax_params/insurance-fee-percentage", {
    method: "POST",
    body: JSON.stringify({ percent, recalculate, year }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var insuranceFeePercentageHandler = async (currentPercent) => {
  var input = document.getElementById("insurance-fee-percentage");
  input.placeholder = "сейчас процент равен " + currentPercent;

  var radioButton = document.getElementById(
    "recalculate-all-reports-insurance-fee-percentage"
  );

  var button = document.getElementById("insurance-fee-percentage-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var selectElem = document.getElementById("tax-year-select-3");

    var selectedYear = +selectElem.value;

    if (typeof selectedYear === "number" && isNaN(selectedYear)) {
      var currentYear = new Date().getFullYear();

      selectedYear = currentYear;
    }

    var recalculate = radioButton.checked;

    var newPercent = +input.value;

    if (typeof newPercent === "number" && isNaN(newPercent)) {
      return alert("Введите числовое значение");
    }

    if (newPercent === currentPercent) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (newPercent < 0 && newPercent > 100) {
      return alert("Недопустимое значение");
    }

    var successChange = await sendPercent(
      newPercent,
      recalculate,
      selectedYear
    );

    if (successChange) {
      return alert("Процент успешно установлен");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default insuranceFeePercentageHandler;
