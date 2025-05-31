var calcTotalFinesPerItem = async (data, itemName) => {
  var item = data.filter((e) => e.sa_name == itemName);

  var totalFinesPerItem = item.reduce((acc, i) => acc + i.penalty, 0);

  return totalFinesPerItem;
};

module.exports = calcTotalFinesPerItem;
