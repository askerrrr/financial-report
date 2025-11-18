import weekDaySelectorIsNotHidden from "./weekDaySelectorIsNotHidden.js";
import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var createDiscountnput = ({ skuName, discount }) => {
  var input = document.createElement("input");
  input.type = "text";
  input.value = discount;
  input.className = "input";
  input.id = skuName + "_discount";

  input.addEventListener("keyup", function () {
    var discount = +this.value;
    var price = document.getElementById(skuName + "_price").value;

    var newDiscountedPriceValue = calcDiscountedPrice({ price, discount });

    if (typeof discount === "number" && !isNaN(discount)) {
      var modalDiscountedPriceElement = document.getElementById(
        skuName + "_modal_discountedPrice_field"
      );

      modalDiscountedPriceElement.textContent = newDiscountedPriceValue;

      if (weekDaySelectorIsNotHidden()) {
        var skuDiscountTdElement = document.getElementById(skuName + "-" + "discount");
        skuDiscountTdElement.textContent = discount;

        var skuDiscountedPriceTdElement = document.getElementById(skuName + "-discountedPrice");
        skuDiscountedPriceTdElement.textContent = newDiscountedPriceValue;

        var skuClubDiscountedPriceTdElement = document.getElementById(
          skuName + "-clubDiscountedPrice"
        );
        skuClubDiscountedPriceTdElement.textContent = newDiscountedPriceValue;
      }
    }
  });

  return input;
};

export default createDiscountnput;
