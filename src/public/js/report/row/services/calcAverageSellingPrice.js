var calcAverageSellingPrice = async (WBSalesAmount, qty) =>
  Math.floor(WBSalesAmount / qty);

export default calcAverageSellingPrice;