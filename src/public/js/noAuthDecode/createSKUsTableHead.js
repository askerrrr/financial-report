import createThElement from "../report/row/services/createThElement.js";

var createSKUsTableHead = async () => {
  var article = await createThElement("Артикул");
  var qty = await createThElement("Кол-во");
  var returnAmount = await createThElement("Возвраты");
  var costPrice = await createThElement("Себестоимость");
  var averageRetailPrice = await createThElement("Средняя розничная цена");
  var deliveryCost = await createThElement("Доставка");
  var deductionOrPayment = await createThElement("Удержания/Выплатыs");
  var storageCost = await createThElement("Хранение");
  var acceptance = await createThElement("Приемка");
  var profit = await createThElement("Выплата с вычетом всех услуг WB");
  var averageProfit = await createThElement("Средняя прибыль с вычетом всех услуг WB на 1 ед.");
  var profitMargin = await createThElement("Чистая прибыль в %");
  var finalProfit = await createThElement("Итого в р.");

  var tr = document.getElementById("thead-tr");

  tr.append(
    article,
    qty,
    returnAmount,
    costPrice,
    averageRetailPrice,
    deliveryCost,
    deductionOrPayment,
    storageCost,
    acceptance,
    profit,
    averageProfit,
    profitMargin,
    finalProfit
  );
};

export default createSKUsTableHead;
