var tokenDataTable = document.getElementById("token-data-table");

var enableTokenDataTable = () => (tokenDataTable.hidden = false);
var disableTokenDataTable = () => (tokenDataTable.hidden = true);

export { enableTokenDataTable, disableTokenDataTable };
