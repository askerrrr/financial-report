var createDiscountedPriceField = ({ skuName, discountedPrice }) => {
  var label = document.createElement("label");
  label.innerHTML = `цена со скидкой: <div class="price-value" id="${skuName}_discountedPrice">${discountedPrice}</div>`;
  return label;
};
export default createDiscountedPriceField;
