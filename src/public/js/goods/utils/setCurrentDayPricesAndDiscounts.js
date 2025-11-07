import getCurrentDayMSK from "./getCurrentDayMSK.js";

var setCurrentDayPricesAndDiscounts = () => {
  var { currentDayName } = getCurrentDayMSK();

  var options = document.querySelectorAll("option");
  for (var option of options) {
    if (option.text === currentDayName) {
      option.selected = true;
      break;
    }
  }
};

export default setCurrentDayPricesAndDiscounts;
