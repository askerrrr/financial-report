var createDiscountedPriceField = ({ skuName, discountedPrice }) => {
  var div = document.createElement("div");
  div.className = "discountedPrice";
  div.textContent = discountedPrice;
  div.id = skuName + "_discountedPrice";

  return div;
};

export default createDiscountedPriceField;
