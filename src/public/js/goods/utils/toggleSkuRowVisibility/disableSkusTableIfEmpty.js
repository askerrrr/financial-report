import {
  toggleSkuTableVisibillity,
  toggleTableScrollVisibillity,
} from "../visibilityToggle/index.js";

var disableSkusTableIfEmpty = (hasDsblAttribute) => {
  var requiredTableBodyId = hasDsblAttribute
    ? "disabled-skus-tbody"
    : "enabled-skus-tbody";

  var tableBody = document.getElementById(requiredTableBodyId);
  var tableIsEmpty = tableBody.childNodes.length === 0;

  if (hasDsblAttribute && tableIsEmpty) {
    toggleSkuTableVisibillity("disabled-skus-table", "disable");
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
  } else if (!hasDsblAttribute && tableIsEmpty) {
    toggleSkuTableVisibillity("enabled-skus-table", "disable");
    toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
  }
};

export default disableSkusTableIfEmpty;
