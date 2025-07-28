var sendMandatoryInsurancePremiums = async (mandatoryInsurancePremiums) => {
  var res = await fetch("/tax_params/mandatory-insurance-premiums", {
    method: "POST",
    body: JSON.stringify({ mandatoryInsurancePremiums }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var mandatoryInsurancePremiumsHandler = async (
  currentMandatoryInsurancePremiums
) => {
  var input = document.getElementById("mandatory-insurance-premiums");
  input.placeholder =
    "сейчас сумма равна " + currentMandatoryInsurancePremiums + "р.";

  var button = document.getElementById("mandatory-insurance-premiums-button");

  button.onclick = async (e) => {
    e.preventDefault();

    var newMandatoryInsurancePremiums = +input.value;

    if (
      typeof newMandatoryInsurancePremiums === "number" &&
      isNaN(newMandatoryInsurancePremiums)
    ) {
      return alert("Введите числовое значение");
    }

    if (newMandatoryInsurancePremiums === currentMandatoryInsurancePremiums) {
      return alert("Новое значение совпадает с предыдущим");
    }

    if (
      newMandatoryInsurancePremiums < 0 &&
      newMandatoryInsurancePremiums > 1e5
    ) {
      return alert("Недопустимое значение");
    }

    var successChange = await sendMandatoryInsurancePremiums(
      newMandatoryInsurancePremiums
    );

    if (successChange) {
      return alert("Сумма обязательных страховых взносов установлена");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsurancePremiumsHandler;
