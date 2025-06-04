var calcDeliveryCostPerItem = async (data, itemName) => {
  var items = data.filter((e) => e.sa_name == itemName);

  var deliveryCostPerItem = items.reduce((acc, i) => acc + i.delivery_rub, 0);

  return deliveryCostPerItem;
};

module.exports = calcDeliveryCostPerItem;
