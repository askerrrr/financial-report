var createPriceInput = ({ skuName, price }) => {
  var input = document.createElement("input");
  input.value = price;
  input.type = "text";
  input.className = "input";
  input.id = skuName + "_price";

  input.addEventListener("keyup", function () {
    var discount = document.getElementById(skuName + "_discount").value;
    var newDiscountedPriceValue = +this.value - (+this.value * discount) / 100;

    if (typeof +this.value === "number" && !isNaN(+this.value)) {
      document.getElementById(skuName + "_discountedPrice").textContent = newDiscountedPriceValue;
    }
  });

  return input;
};

export default createPriceInput;
