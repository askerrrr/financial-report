var calcSellerPayoutAmountPerSKU = async (sku) => sku.reduce((acc, i) => acc + i.ppvz_for_pay, 0);

module.exports = calcSellerPayoutAmountPerSKU;
