import {
  toggleSkuTableVisibillity,
  toggleTableScrollVisibillity,
} from "./visibilityToggle/index.js";

var switchToEnabledSkusTableBtn = document.getElementById("switch-to-enabled");
var switchToDisabledSkusTableBtn =
  document.getElementById("switch-to-disabled");

var switchToActiveTable = (enabledSkus, disabledSkus) => {
  if (enabledSkus.length) {
    switchToEnabledSkusTableBtn.className = "tab is-active";
    switchToEnabledSkusTableBtn.setAttribute("aria-selected", true);

    switchToDisabledSkusTableBtn.className = "tab";
    switchToDisabledSkusTableBtn.setAttribute("aria-selected", false);

    toggleSkuTableVisibillity("enabled-skus-table", "enable");
    toggleTableScrollVisibillity("enabled-skus-table-scroll", "enable");

    toggleSkuTableVisibillity("disabled-skus-table", "disable");
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
  } else if (disabledSkus.length) {
    switchToEnabledSkusTableBtn.className = "tab";
    switchToEnabledSkusTableBtn.setAttribute("aria-selected", false);

    switchToDisabledSkusTableBtn.className = "tab is-active";
    switchToDisabledSkusTableBtn.setAttribute("aria-selected", true);

    toggleSkuTableVisibillity("enabled-skus-table", "disable");
    toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");

    toggleSkuTableVisibillity("disabled-skus-table", "enable");
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");
  }
};

export default switchToActiveTable;
