import { fontStyles, alignmentStyles } from "./styles.js";

var writeSKU = (sku, ws, cellNumOfSkuName) => {
  var { id, skuName, price, discount, discountedPrice } = sku;

  ws.addRow([skuName]).font = fontStyles;
  ws.getRow(cellNumOfSkuName).alignment = alignmentStyles;
  ws.getCell("A" + cellNumOfSkuName).name = "skuName";
  ws.getCell("A" + cellNumOfSkuName).value = skuName;

  ws.addRow(["цена", ...new Array(7).fill(price)]).alignment = alignmentStyles;
  ws.addRow(["скидка", ...new Array(7).fill(discount)]).alignment = alignmentStyles;
  ws.addRow(["цена со скидкой", ...new Array(7).fill(discountedPrice)]).alignment = alignmentStyles;

  return ws;
};

export default writeSKU;
