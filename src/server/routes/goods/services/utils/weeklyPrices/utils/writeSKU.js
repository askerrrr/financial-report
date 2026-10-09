import { fontStyles, alignmentStyles } from "./styles.js";

var writeSKU = (sku, ws, indentToSkuName) => {
  var { skuName, weeklyPrices, weeklyDiscounts } = sku;

  // ws.addRow([skuName]).font = fontStyles;

  ws.getRow(indentToSkuName).alignment = alignmentStyles;
  ws.getRow(indentToSkuName).font = fontStyles;
  ws.getCell("A" + indentToSkuName).name = "skuName";
  ws.getCell("A" + indentToSkuName).value = skuName;

  ws.addRow(["цена", ...weeklyPrices]).alignment = alignmentStyles;

  ws.addRow(["скидка", ...weeklyDiscounts]).alignment = alignmentStyles;

  ws.addRow(["цена со скидкой"]).alignment = alignmentStyles;

  // ws.addRow(["интервал обновления"]).alignment = alignmentStyles;
  // ws.addRow([
  //   "менять цену, если товар в акции",
  //   ...new Array(7).fill("нет"),
  // ]).alignment = alignmentStyles;

  return ws;
};

export default writeSKU;
