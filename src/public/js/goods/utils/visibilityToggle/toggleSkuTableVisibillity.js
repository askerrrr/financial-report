/**
 * @param {'enabled-skus-table' | 'disabled-skus-table'} tableID
 * @param {'enable' | 'disable'} action
 */

var toggleSkuTableVisibillity = (tableID, action) => {
  var skuTable = document.getElementById(tableID);

  skuTable.hidden = action === "disable";
};
export default toggleSkuTableVisibillity;
