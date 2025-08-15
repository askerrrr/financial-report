var updateSKUsTableFields = async (sku) => {
  var { skuIndex } = sku;

  delete sku.skuIndex;

  for (var fildName of Object.keys(sku)) {
    var elemId = [fildName, skuIndex].join("-");

    document.getElementById(elemId).textContent = sku[fildName];
  }
};

export default updateSKUsTableFields;
