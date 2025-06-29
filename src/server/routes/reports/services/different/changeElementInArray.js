var changeElementInArray = async (skus, { index, value, fieldName }) => {
  var sku = skus[index];

  sku[fieldName] = value;

  skus[index] = sku;

  return skus;
};

module.exports = changeElementInArray;
