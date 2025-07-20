var sendMandatoryInsurancePremiums = async (mandatoryInsurancePremiums) => {
  var res = await fetch("/options/mandatory-insurance-premiums", {
    method: "POST",
    body: JSON.stringify({ mandatoryInsurancePremiums }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var mandatoryInsurancePremiumsHandler = async (mandatoryInsurancePremiums) => {
  var input = document.getElementById("mandatory-insurance-premiums");
  input.placeholder = "сейчас сумма равна " + mandatoryInsurancePremiums + "р.";

  var button = document.getElementById("mandatory-insurance-premiums-button");

  button.onclick = async (e) => {
    e.preventDefault();

    mandatoryInsurancePremiums = +input.value;

    if (mandatoryInsurancePremiums < 0 && mandatoryInsurancePremiums > 1e5) {
      return alert("Недопустимое значение");
    }

    var successChange = await sendMandatoryInsurancePremiums(
      mandatoryInsurancePremiums
    );

    if (successChange) {
      return alert("Сумма обязательных страховых взносов установлена");
    }

    return alert("Произошла ошибка...\nПопробуйте позже");
  };
};

export default mandatoryInsurancePremiumsHandler;
