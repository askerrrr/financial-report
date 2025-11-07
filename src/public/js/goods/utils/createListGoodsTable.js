import createTdElement from "./createTdElement.js";
import openModalButton from "./modal/openModalButton.js";

var createListGoodsTable = async (listGoods) => {
  var tbody = document.getElementById("enabled-skus-tbody");

  for (var item of listGoods) {
    let { skuName, price, discount, discountedPrice, clubDiscountedPrice } = item;

    var tr = document.createElement("tr");
    tr.id = skuName;
    var skuNameTd = createTdElement(skuName, skuName, "skuName");

    var priceTd = createTdElement(price, skuName, "price");

    var discountTd = createTdElement(discount, skuName, "discount");
    skuName;
    var discountedPriceTd = createTdElement(discountedPrice, skuName, "discountedPrice");
    var clubDiscountedPriceTd = createTdElement(clubDiscountedPrice, skuName, "clubDiscountedPrice");

    var modalButton = await openModalButton(item);

    tr.append(skuNameTd, priceTd, discountTd, discountedPriceTd, clubDiscountedPriceTd, modalButton);

    tbody.append(tr);
  }
};

export default createListGoodsTable;
