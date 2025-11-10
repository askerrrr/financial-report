var createDiscountnput = ({ skuName, discount }) => {
  var input = document.createElement("input");
  input.type = "text";
  input.value = discount;
  input.className = "input";
  input.id = skuName + "_discount";

  input.addEventListener("keyup", function () {
    var price = document.getElementById(skuName + "_price").value;
    var newDiscountedPriceValue = price - (price * +this.value) / 100;

    if (typeof +this.value === "number" && !isNaN(+this.value)) {
      var skuDiscountTdElement = document.getElementById(skuName + "-" + "discount");
      skuDiscountTdElement.textContent = this.value;

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

export default createDiscountnput;
