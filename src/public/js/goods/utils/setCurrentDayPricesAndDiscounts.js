var getCurrentDayMSK = () => {
  var formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    weekday: "long",
  });

  return { currentDayName: formatter.format(new Date()) };
};

var setCurrentDayPricesAndDiscounts = () => {
  var { currentDayName } = getCurrentDayMSK();

  var options = [...document.querySelectorAll("option")];

  for (var option of options) {
    if (option.text === currentDayName) {
      option.selected = true;
    }
  }
};

export default setCurrentDayPricesAndDiscounts;
