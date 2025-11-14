var elementsEnding = ["-price", "-discount", "-discountedPrice", "-clubDiscountedPrice", "-modal"];

var unhideSkuElements = (skuName) => {
  for (var end of elementsEnding) {
    document.getElementById(skuName + end).hidden = false;
  }
};

export default unhideSkuElements;
