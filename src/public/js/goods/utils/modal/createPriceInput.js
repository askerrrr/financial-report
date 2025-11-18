import weekDaySelectorIsNotHidden from "./weekDaySelectorIsNotHidden.js";
import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var createPriceInput = ({ skuName, price }) => {
  var input = document.createElement("input");
  input.value = price;
  input.type = "text";
  input.className = "input";
  input.id = skuName + "_price";

  input.addEventListener("keyup", function () {
    var price = +this.value;
    var discount = document.getElementById(skuName + "_discount").value;

    var newDiscountedPriceValue = calcDiscountedPrice({ price, discount });

    if (typeof price === "number" && !isNaN(price)) {
      var modalDiscountedPriceElement = document.getElementById(
        skuName + "_modal_discountedPrice_field"
      );

      modalDiscountedPriceElement.textContent = newDiscountedPriceValue;

      if (weekDaySelectorIsNotHidden()) {
        var skuPriceTdElement = document.getElementById(skuName + "-" + "price-expected");
        skuPriceTdElement.textContent = price;

        var skuDiscountedPriceTdElement = document.getElementById(
          skuName + "-discountedPrice-expected"
        );
        skuDiscountedPriceTdElement.textContent = newDiscountedPriceValue;

        var skuClubDiscountedPriceTdElement = document.getElementById(
          skuName + "-clubDiscountedPrice-expected"
        );
        skuClubDiscountedPriceTdElement.textContent = newDiscountedPriceValue;
      }
    }
  });

  return input;
};

export default createPriceInput;
