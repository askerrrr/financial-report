var updateCalculatedTableFields = async (sku) => {
  var { skuIndex } = sku;
  console.log({ sku });
  delete sku.skuIndex;

  for (var fildName of Object.keys(sku)) {
    var elemId = [fildName, skuIndex].join("-");

    document.getElementById(elemId).textContent = sku[fildName];
  }
};

export default updateCalculatedTableFields;
