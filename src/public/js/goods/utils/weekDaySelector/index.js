var weekDaySelectorHandler = (weeklyPricesAndDiscounts) => {
  var weekDaySelector = document.getElementById("week-days-select");

  weekDaySelector.addEventListener("change", (e) => {
    var selectedWeekDay = +e.target.value;
    var pricesAndDiscounts = weeklyPricesAndDiscounts[selectedWeekDay];
  });
};

weekDaySelectorHandler();
