import calcDiscountedPrice from "./calcDiscountedPrice.js";

var weekDaySelectorHandler = async (listGoods, weeklyPricesAndDiscounts) => {
  var weekDaySelector = document.getElementById("week-days-select");

  weekDaySelector.addEventListener("change", (e) => {
    var selectedWeekDayId = +e.target.value;
    var pricesAndDiscounts = weeklyPricesAndDiscounts[selectedWeekDayId];

    for (var { skuName, id } of listGoods) {
      var selectedDay = pricesAndDiscounts.find((item) => item.nmID === id);

      if (selectedDay) {
        var priceTdElem = document.getElementById(`${skuName}-price`);
        priceTdElem.textContent = selectedDay.price;

        var discountTdElem = document.getElementById(`${skuName}-discount`);
        discountTdElem.textContent = selectedDay.discount;

        var discountedPrice = calcDiscountedPrice(selectedDay);

        var discountedPriceTdElem = document.getElementById(`${skuName}-discountedPrice`);
        discountedPriceTdElem.textContent = discountedPrice;

        var clubDiscountedPriceTdElem = document.getElementById(`${skuName}-clubDiscountedPrice`);
        clubDiscountedPriceTdElem.textContent = discountedPrice;
      }
    }
  });
};

export default weekDaySelectorHandler;
