var shortNum = require("./shortNum");

var truncateItemsNums = async (items) => {
  var result = await Promise.all(
    items.map(async (item) => {
      for (var elem of Object.keys(item)) {
        if (typeof item[elem] == "number") {
          item[elem] = await shortNum(item[elem]);
        }
      }

      return item;
    })
  );

  return result;
};

module.exports = truncateItemsNums;
