var calcAverageRetailPricePerItem = async (data, quantity, itemName) => {
  var items = data.filter((e) => e.sa_name == itemName && e.retail_price !== 0);

  var retailPrices = items.reduce((acc, e) => acc + e.retail_price, 0);

  var averageRetailPrice = retailPrices / quantity;

  return Math.round(averageRetailPrice);
};

module.exports = calcAverageRetailPricePerItem;
