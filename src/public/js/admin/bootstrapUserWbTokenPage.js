import getTokenData from "../wbToken/getTokenData.js";
import renameSaveButton from "../wbToken/renameSaveButton.js";
import loadTokenButtonHander from "../wbToken/loadTokenButtonHander.js";
import { insertDataToTokenDataTable } from "../wbToken/tokenDataTable.js";
import removeTokenButtonHandler from "../wbToken/removeTokenButtonHandler.js";
import { enableTokenDataTable } from "../wbToken/toggleVisibilityOfTokenDataTable.js";
import { enableRemoveTokenButton } from "../wbToken/toggleVisibilityOfRemoveTokenButton.js";

var userId = window.location.pathname.split("/").at(-1);
var btnBackToMainPage = document.getElementById("back-to-main-page-btn");

var bootstrapUserWbTokenPage = async () => {
  var { tokenData } = await getTokenData(userId);

  if (tokenData.tokenIsExist) {
    renameSaveButton();
    enableTokenDataTable();
    enableRemoveTokenButton();
    insertDataToTokenDataTable(tokenData);

    removeTokenButtonHandler(userId);
  }

  loadTokenButtonHander(userId);

  btnBackToMainPage.onclick = () => (window.location.href = "/admin/user/" + userId);
};

bootstrapUserWbTokenPage();
