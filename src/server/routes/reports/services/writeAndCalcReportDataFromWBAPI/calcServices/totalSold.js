var calcTotalSold = async (data, itemsName) => {
  var totalSold = [];

  for (var i = 0; i < itemsName.length; i++) {
    var items = data.filter((e) => e.sa_name == itemsName[i]);

    totalSold.push(...items);
  }

  return totalSold.reduce((acc, i) => acc + i.quantity, 0);
};

module.exports = calcTotalSold;
