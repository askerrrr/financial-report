var compareCurrentValuesWithNew = (item, newPrice, newDiscount) => {
  var currentPrice = item.price;
  var currentDiscount = item.discount;

  var newAndCurrentPriceAreEqual = newPrice === currentPrice;
  var newAndCurentDiscountAreEqual = newDiscount === currentDiscount;

  if (newAndCurrentPriceAreEqual && newAndCurentDiscountAreEqual) {
    alert(`Текущие значения уже установлены, введите новые`);
    return { valuesAreNotEqual: false };
  }

  return { valuesAreNotEqual: true };
};

export default compareCurrentValuesWithNew;
