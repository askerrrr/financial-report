var emptyStateToDisabledSkuTable = document.getElementById(
  "empty-state-disabled",
);

/**
 * @param {'enable' | 'disable'} action
 */

var toggleEmptyStateToDisabledSkus = (action) => {
  console.log({ action: action === "disable" });
  emptyStateToDisabledSkuTable.hidden = action === "disable";
};

export default toggleEmptyStateToDisabledSkus;
