import getTokenData from "./getTokenData.js";
import { insertDataToTokenDataTable } from "./tokenDataTable.js";
import { enableTokenDataTable } from "./toggleVisibilityOfTokenDataTable.js";
import { enableRemoveTokenButton } from "./toggleVisibilityOfRemoveTokenButton.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { tokenData } = await getTokenData(userId);

  if (tokenData.tokenIsExist) {
    enableTokenDataTable();
    enableRemoveTokenButton();
    insertDataToTokenDataTable(tokenData);
  }
};

main();
