import getTokenData from "./getTokenData.js";
import insertDataToTable from "./insertDataToTable.js";
import { enableTokenDataTable } from "./toggleVisibilityOfTokenDataTable.js";
import { enableRemoveTokenButton } from "./toggleVisibilityOfRemoveTokenButton.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { tokenData } = await getTokenData(userId);

  if (tokenData.tokenIsExist) {
    enableTokenDataTable();
    enableRemoveTokenButton();
    insertDataToTable(tokenData);
  }
};

main();
