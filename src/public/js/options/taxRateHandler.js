var sendTaxRate = async (taxRate, recalculate) => {
  var res = await fetch("/options/taxrate", {
    method: "POST",
    body: JSON.stringify({ taxRate, recalculate }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var taxRateHandler = async (taxRate) => {
  var input = document.getElementById("tax-rate");
  input.placeholder = "сейчас процент равен " + taxRate;

  var radioButton = document.getElementById(
    "recalculate-all-reports-tax-amount"
  );

  var button = document.getElementById("tax-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var recalculate = radioButton.checked;

    taxRate = +input.value;

    if (taxRate < 1 || taxRate > 15) {
      return alert("Недопустимое значение");
    }

    var successChange = await sendTaxRate(taxRate, recalculate);

    if (successChange) {
      return alert("Изменение успешно применено");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default taxRateHandler;
