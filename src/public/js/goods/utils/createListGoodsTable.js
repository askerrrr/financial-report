import createInputField from "./createInputField.js";
import createTdElement from "../../report/table/services/createTdElement.js";

var createListGoodsTable = async (listGoods) => {
  var tbody = document.getElementById("list-goods-tbody");

  for (var item of listGoods) {
    var { skuName, price, discount, discountedPrice, clubDiscountedPrice } = item;

    var tr = document.createElement("tr");
    var skuNameTd = createTdElement(skuName, "skuName");

    var priceTd = createTdElement(price, "price");

    var discountTd = createTdElement(discount, "discount");

    var discountedPriceTd = createTdElement(discountedPrice, "discountedPrice");
    var clubDiscountedPriceTd = createTdElement(clubDiscountedPrice, "clubDiscountedPrice");

    var inputField = await createInputField(item, skuName);
    var inputFieldTd = createTdElement(inputField);

    tr.append(
      skuNameTd,
      priceTd,
      discountTd,
      discountedPriceTd,
      clubDiscountedPriceTd,
      inputFieldTd
    );

    tbody.append(tr);
  }
};

export default createListGoodsTable;
