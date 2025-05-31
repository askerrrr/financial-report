var sumProductQuantities = async (data) => {
  var totalProducts = data.qty.reduce((acc, i) => acc + i);

  data.totalProducts = totalProducts;

  return data;
};

module.exports = sumProductQuantities;
