var blockPriceDiscountModalOpening = (skuName) => {
  var modalBtn = document.getElementById(skuName + "-modal");
  modalBtn.disable = true;
};

var unlockPriceDiscountModalOpening = (skuName) => {
  var modalBtn = document.getElementById(skuName + "-modal");
  modalBtn.disable = false;
};

export { unlockPriceDiscountModalOpening, blockPriceDiscountModalOpening };
