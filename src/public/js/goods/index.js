import createListGoodsTable from "./utils/createListGoodsTable.js";

var getListGoods = async () => {
  var userId = document.cookie.split("=")[1];
  var url = "/goods/" + userId;

  var res = await fetch(url);

  if (!res.ok) {
    alert("some error message");
    return;
  }

  var { listGoods } = await res.json();

  return { listGoods };
};

var showListGoodsTable = async () => {
  var { listGoods } = await getListGoods();
  createListGoodsTable(listGoods);
};

showListGoodsTable();
