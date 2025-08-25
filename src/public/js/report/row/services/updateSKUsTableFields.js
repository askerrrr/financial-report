var updateSKUsTableFields = async (sku) => {
  var { skuIndex } = sku;

  delete sku.skuIndex;

  for (var fieldName of Object.keys(sku)) {
    var elemId = [fieldName, skuIndex].join("-");

    var skuField = document.getElementById(elemId);
    skuField.textContent = sku[fieldName];

    if (sku[fieldName] < 0) {
      skuField.style.color = "red";
    } else {
      skuField.style.color = "#04ff00";
    }
  }
};

export default updateSKUsTableFields;
