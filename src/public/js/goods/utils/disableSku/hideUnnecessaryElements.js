var elementsEnding = ["-price", "-discount", "-discountedPrice", "-clubDiscountedPrice", "-modal"];

var hideUnnecessaryElements = (skuName) => {
  for (var end of elementsEnding) {
    document.getElementById(skuName + end).hidden = true;
  }
};

export default hideUnnecessaryElements;
