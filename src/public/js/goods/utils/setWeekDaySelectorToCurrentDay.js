import getCurrentDayMSK from "./getCurrentDayMSK.js";

var setWeekDaySelectorToCurrentDay = () => {
  var { currentDayName } = getCurrentDayMSK();

  var options = document.querySelectorAll("option");
  for (var option of options) {
    if (option.text === currentDayName) {
      option.selected = true;
      break;
    }
  }
};

export default setWeekDaySelectorToCurrentDay;
