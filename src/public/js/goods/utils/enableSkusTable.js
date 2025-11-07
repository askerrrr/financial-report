/**
 * @param {'enabled-skus-table' | 'disabled-skus-table'} tableID
 */

var enableSkusTable = (tableID) => {
  document.getElementById(tableID).hidden = false;
};
