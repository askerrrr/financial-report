var shortNum = require("../shortNum");

var calcTotalStorageCost = async (data) => {
  var totalStorageCost = data.reduce((acc, i) => acc + i.storage_fee, 0);

  return await shortNum(totalStorageCost);
};

module.exports = calcTotalStorageCost;
