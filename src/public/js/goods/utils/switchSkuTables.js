import {
  toggleSkuTableVisibillity,
  toggleTableScrollVisibillity,
} from "./visibilityToggle/index.js";

var switchToEnabledSkusTableBtn = document.getElementById("switch-to-enabled");
var switchToDisabledSkusTableBtn =
  document.getElementById("switch-to-disabled");

var switchSkuTables = () => {
  switchToEnabledSkusTableBtn.addEventListener("click", () => {
    switchToEnabledSkusTableBtn.className = "tab is-active";
    switchToEnabledSkusTableBtn.setAttribute("aria-selected", true);

    switchToDisabledSkusTableBtn.className = "tab";
    switchToDisabledSkusTableBtn.setAttribute("aria-selected", false);

    var enabledSkusTbody = document.getElementById("enabled-skus-tbody");

    if (enabledSkusTbody.childNodes.length) {
      toggleSkuTableVisibillity("disabled-skus-table", "disable");
      toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");

      toggleSkuTableVisibillity("enabled-skus-table", "enable");
      toggleTableScrollVisibillity("enabled-skus-table-scroll", "enable");
    } else {
      toggleSkuTableVisibillity("disabled-skus-table", "disable");
      toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");

      toggleSkuTableVisibillity("enabled-skus-table", "disable");
      toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
    }
  });

  switchToDisabledSkusTableBtn.addEventListener("click", () => {
    switchToEnabledSkusTableBtn.className = "tab";
    switchToEnabledSkusTableBtn.setAttribute("aria-selected", false);

    switchToDisabledSkusTableBtn.className = "tab is-active";
    switchToDisabledSkusTableBtn.setAttribute("aria-selected", true);

    var disabledSkusTbody = document.getElementById("disabled-skus-tbody");

    if (disabledSkusTbody.childNodes.length) {
      toggleSkuTableVisibillity("disabled-skus-table", "enable");
      toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");

      toggleSkuTableVisibillity("enabled-skus-table", "disable");
      toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
    } else {
      toggleSkuTableVisibillity("disabled-skus-table", "disable");
      toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");

      toggleSkuTableVisibillity("enabled-skus-table", "disable");
      toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
    }
  });
};

export default switchSkuTables;
