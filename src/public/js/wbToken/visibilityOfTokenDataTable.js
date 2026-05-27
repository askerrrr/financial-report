var tokenDataTable = document.getElementById("token-table-data");

var enableTokenDataTable = () => (tokenDataTable.hidden = false);
var disableTokenDataTable = () => (tokenDataTable.hidden = true);

export { enableTokenDataTable, disableTokenDataTable };
