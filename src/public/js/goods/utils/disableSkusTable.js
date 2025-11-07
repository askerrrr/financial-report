/**
 * @param {'enabled-skus-table' | 'disabled-skus-table'} tableID
 */

var disableSkusTable = (tableID) => {
  document.getElementById(tableID).hidden = true;
};

export default disableSkusTable;
