var updateSKUsTableFields = async (sku) => {
  var { skuIndex, data } = sku;

  for (var fieldName of Object.keys(data)) {
    var elemId = [fieldName, skuIndex].join("-");
    var skuField = document.getElementById(elemId);
    skuField.textContent = data[fieldName];

    if (data[fieldName] < 0) {
      skuField.style.color = "red";
    } else {
      skuField.style.color = "#04ff00";
    }
  }
};

export default updateSKUsTableFields;
