var getItemsName = async (data) => {
  var items = data.filter((e) => e.sa_name !== "");

  var itemsName = items.map((e) => e.sa_name);

  var result = [];

  for (var i = 0; i < itemsName.length; i++) {
    if (!result.includes(itemsName[i])) {
      result.push(itemsName[i]);
    }
  }

  return result;
};

module.exports = getItemsName;
