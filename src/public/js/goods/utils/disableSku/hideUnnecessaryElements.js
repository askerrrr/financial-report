var elementsEnding = [
  "-price",
  "-price-expected",
  "-discount",
  "-discount-expected",
  "-discountedPrice",
  "-discountedPrice-expected",
  "-clubDiscountedPrice",
  "-clubDiscountedPrice-expected",
  "-modal",
];

var hideUnnecessaryElements = (skuName) => {
  for (var end of elementsEnding) {
    var skuRowElem = document.getElementById(skuName + end);

    if (skuRowElem) skuRowElem.hidden = true;
  }
};

export default hideUnnecessaryElements;
