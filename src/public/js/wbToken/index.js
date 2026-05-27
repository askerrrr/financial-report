import getTokenData from "./getTokenData.js";
import insertDataToTable from "./insertDataToTable.js";
import { enableTokenDataTable } from "./toggleVisibilityOfTokenDataTable.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { tokenData } = await getTokenData(userId);

  if (tokenData.tokenIsExist) {
    enableTokenDataTable();
    insertDataToTable(tokenData);
  }
};

main();
