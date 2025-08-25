var calcTotalFines = async (skus) => skus.reduce((acc, sku) => acc + sku.finesPerSKU, 0);

module.exports = calcTotalFines;
