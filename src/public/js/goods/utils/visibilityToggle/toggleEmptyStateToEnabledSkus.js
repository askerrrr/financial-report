var emptyStateToEnabledSkuTable = document.getElementById(
  "empty-state-enabled",
);

/**
 * @param {'enable' | 'disable'} action
 */

var toggleEmptyStateToEnabledSkus = (action) => {
  emptyStateToEnabledSkuTable.hidden = action !== "enable";
};

export default toggleEmptyStateToEnabledSkus;
