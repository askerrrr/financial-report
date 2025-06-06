var getItemsName = async (data) => {
  var items = data.filter((e) => e.sa_name !== "");

  var itemsName = items.map((e) => e.sa_name);

  var result = [];

  for (var name of itemsName) {
    if (!result.includes(name)) {
      result.push(name);
    }
  }

  return result;
};

module.exports = getItemsName;
