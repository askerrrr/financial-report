import calcDiscountedPrice from "./calcDiscountedPrice.js";

var actualItemEndings = ["-price", "-discount", "-discountedPrice", "-clubDiscountedPrice"];
var expectedItemEndings = [
  "-price-expected",
  "-discount-expected",
  "-discountedPrice-expected",
  "-clubDiscountedPrice-expected",
];

var weekDaySelectorHandler = async (skus, weeklyPricesAndDiscounts, currentDayIndex) => {
  var weekDaySelector = document.getElementById("week-days-select");

  weekDaySelector.addEventListener("change", (e) => {
    var selectedWeekDayId = +e.target.value;
    var pricesAndDiscounts = weeklyPricesAndDiscounts[selectedWeekDayId];

    for (var { skuName, id } of skus) {
      var selectedDay = pricesAndDiscounts.find((item) => item.nmID === id);

      if (selectedDay) {
        var expectedPriceTdElem = document.getElementById(`${skuName}-price-expected`);
        expectedPriceTdElem.textContent = selectedDay.price;

        var expectedDiscountTdElem = document.getElementById(`${skuName}-discount-expected`);
        expectedDiscountTdElem.textContent = selectedDay.discount;

        var expectedDiscountedPrice = calcDiscountedPrice(selectedDay);

        var expectedDiscountedPriceTdElem = document.getElementById(
          `${skuName}-discountedPrice-expected`
        );
        expectedDiscountedPriceTdElem.textContent = expectedDiscountedPrice;

        var expectedXlubDiscountedPriceTdElem = document.getElementById(
          `${skuName}-clubDiscountedPrice-expected`
        );
        expectedXlubDiscountedPriceTdElem.textContent = expectedDiscountedPrice;

        // if (selectedWeekDayId !== currentDayIndex) {
        //   actualItemEndings.map(
        //     (end) => (document.getElementById(skuName + end).textContent = "неизвестно")
        //   );
        // } else {
        // }
      }
    }
  });
};

export default weekDaySelectorHandler;
