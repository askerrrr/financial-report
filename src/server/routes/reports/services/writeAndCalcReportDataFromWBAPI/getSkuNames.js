var getSkuNames = async (data) => {
  var skus = data.filter((e) => e.sa_name !== "");

  var skuNames = skus.map((e) => e.sa_name);

  var result = [];

  for (var name of skuNames) {
    if (!result.includes(name)) {
      result.push(name);
    }
  }

  return result;
};

module.exports = getSkuNames;
