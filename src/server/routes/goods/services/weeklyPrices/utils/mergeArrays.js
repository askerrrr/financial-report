var mergeArrays = (prices, discounts, nmId) => {
  var data = [];
  for (var i = 0; i < prices.length; i++) {
    data.push({ nmId, price: prices[i], discount: discounts[i] });
  }

  return data;
};

module.exports = mergeArrays;
