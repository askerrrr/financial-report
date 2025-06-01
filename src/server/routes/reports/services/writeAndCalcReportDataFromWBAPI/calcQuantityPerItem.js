var calcQuantityPerItem = async (data, itemName) => {
  var items = data.filter((e) => e.sa_name == itemName);

  var qty = items.reduce((acc, i) => acc + i.quantity, 0);

  return qty;
};

module.exports = calcQuantityPerItem;
