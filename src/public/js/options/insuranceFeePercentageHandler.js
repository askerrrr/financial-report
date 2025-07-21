var sendPercent = async (percent) => {
  var res = await fetch("/options/insurance-fee-percentage", {
    method: "POST",
    body: JSON.stringify({ percent }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var insuranceFeePercentageHandler = async (currentPercent) => {
  var input = document.getElementById("insurance-fee-percentage");
  input.placeholder = "сейчас процент равен " + currentPercent;

  var button = document.getElementById("insurance-fee-percentage-button");

  button.onclick = async (e) => {
    e.preventDefault();

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

    var successChange = await sendPercent(newPercent);

    if (successChange) {
      return alert("Процент успешно установлен");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default insuranceFeePercentageHandler;
