import fileUploadHandler from "./fileUploadHandler.js";
import createListGoodsTable from "./utils/createListGoodsTable.js";

var getListGoods = async () => {
  var userId = document.cookie.split("=")[1];
  var url = "/goods/api/" + userId;

  var res = await fetch(url);

  if (!res.ok) {
    alert("some error message");
    return;
  }

  var { listGoods } = await res.json();

  return { listGoods };
};

var enableListGoodsTable = () => (document.getElementById("list-goods-table").hidden = false);

var showListGoodsTable = async () => {
  var { listGoods } = await getListGoods();

  if (!listGoods.length) {
    //show list goods load button
    return;
  }

  enableListGoodsTable();
  await createListGoodsTable(listGoods);
};

showListGoodsTable();
fileUploadHandler();
