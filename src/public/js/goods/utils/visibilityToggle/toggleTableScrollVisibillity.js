/**
 * @param {'enabled-skus-table-scroll' | 'disabled-skus-table-scroll'} tableScrollId
 * @param {'enable' | 'disable'} action
 */

var toggleTableScrollVisibillity = (tableScrollId, action) => {
  var tableScroll = document.getElementById(tableScrollId);

  tableScroll.hidden = action === "disable";
};

export default toggleTableScrollVisibillity;
