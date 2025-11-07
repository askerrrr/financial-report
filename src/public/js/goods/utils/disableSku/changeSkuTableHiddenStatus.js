/**
 * @param {"enabled-skus-table" | "disabled-skus-table"} tableID
 */

var changeHiddenStatusOfSkusTable = (tableID) => {
  var skusTable = document.getElementById(tableID);

  if (skusTable.hasAttribute("hidden")) {
    skusTable.removeAttribute("hidden");
  } else {
    skusTable.setAttribute("hidden");
  }
};

export default changeHiddenStatusOfSkusTable;
