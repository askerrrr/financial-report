var shortNum  =require('../shortNum')

var calcTotalDeliveryCost = async (skus) =>{
    var totalDeliveryCost =  skus.reduce((acc, sku) => acc + sku.deliveryCostPerSKU, 0)
return await shortNum(totalDeliveryCost)}

module.exports = calcTotalDeliveryCost;
