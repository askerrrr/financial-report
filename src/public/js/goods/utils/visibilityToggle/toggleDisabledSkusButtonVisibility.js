/**
 * @param {'enable' | 'disable'} action
 */

var toggleDisabledSkusButton = document.getElementById("toggle-disabled-skus");

var toggleDisabledSkusButtonVisibility = (action) =>
  (toggleDisabledSkusButton.hidden = action !== "enable");

export default toggleDisabledSkusButtonVisibility;
