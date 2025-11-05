var compareCurrentValuesWithNew = (item) => {
  var currentPrice = item.price;
  var newPrice = +document.getElementById(item.skuName + "-" + "price").textContent;

  var currentDiscount = item.discount;
  var newDiscount = +document.getElementById(item.skuName + "-" + "discount").textContent;

  var newAndCurrentPriceAreEqual = newPrice === currentPrice;
  var newAndCurentDiscountAreEqual = newDiscount === currentDiscount;

  if (newAndCurrentPriceAreEqual && newAndCurentDiscountAreEqual) {
    alert(`Текущие значения уже установлены, введите новые`);
    return { valuesAreNotEqual: false };
  }

  return { valuesAreNotEqual: true };
};

export default compareCurrentValuesWithNew;
