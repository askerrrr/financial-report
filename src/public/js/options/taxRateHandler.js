var sendTaxRate = async (taxRate) => {
  var res = await fetch("/options/taxrate", {
    method: "POST",
    body: JSON.stringify({ taxRate }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};
var taxRateHandler = async () => {
  var input = document.getElementById("tax-rate");

  var button = document.getElementById("tax-rate-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var taxRate = +input.value;

    if (taxRate < 1 || taxRate > 15) {
      return alert("Недопустимое значение");
    }

    var successChange = await sendTaxRate(taxRate);

    if (successChange) {
      return alert("Изменение успешно применено");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default taxRateHandler;
