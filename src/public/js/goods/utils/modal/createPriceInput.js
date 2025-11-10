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
      var skuPriceTdElement = document.getElementById(skuName + "-" + "price");
      skuPriceTdElement.textContent = price;

      var modalDiscountedPriceElement = document.getElementById(skuName + "_modal_discountedPrice_field");
      modalDiscountedPriceElement.textContent = newDiscountedPriceValue;

      var skuDiscountedPriceTdElement = document.getElementById(skuName + "-discountedPrice");
      skuDiscountedPriceTdElement.textContent = newDiscountedPriceValue;

      var skuClubDiscountedPriceTdElement = document.getElementById(skuName + "-clubDiscountedPrice");
      skuClubDiscountedPriceTdElement.textContent = newDiscountedPriceValue;
    }
  });

  return input;
};

export default createPriceInput;
