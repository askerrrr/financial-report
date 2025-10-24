import createInputField from "./createInputField.js";
import createTdElement from "../../report/table/services/createTdElement.js";

var createListGoodsTable = async (listGoods) => {
  var tbody = document.getElementById("list-goods-tbody");

  for (var item of listGoods) {
    var { skuName, price, discount, discountedPrice, clubDiscountedPrice } = item;

    var tr = document.createElement("tr");
    var skuNameTd = createTdElement(skuName, "skuName");

    var priceInputField = await createInputField(price, "price");
    var priceTd = createTdElement(priceInputField, "price");

    var discountInputField = await createInputField(discount, "discount");
    var discountTd = createTdElement(discountInputField, "discount");

    var discountedPriceTd = createTdElement(discountedPrice, "discountedPrice");
    var clubDiscountedPriceTd = createTdElement(clubDiscountedPrice, "clubDiscountedPrice");

    tr.append(skuNameTd, priceTd, discountTd, discountedPriceTd, clubDiscountedPriceTd);

    tbody.append(tr);
  }
};

export default createListGoodsTable;
