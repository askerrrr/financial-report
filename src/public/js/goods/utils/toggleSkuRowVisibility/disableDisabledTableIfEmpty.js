var disabledSkuTbody = document.getElementById("disabled-skus-tbody");
var disabledSkuTable = document.getElementById("disabled-skus-table");
var toggleDisabledSkusButton = document.getElementById("toggle-disabled-skus");

var disableDisabledTableIfEmpty = () => {
  if (!disabledSkuTbody.hasChildNodes()) {
    disabledSkuTable.hidden = true;
    toggleDisabledSkusButton.hidden = true;
  }
};

export default disableDisabledTableIfEmpty;
