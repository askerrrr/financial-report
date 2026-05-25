import buildReportTree from "./buildReportTree.js";
import fileUploadHandler from "./fileUploadHandler.js";
import WBTokenLoaderHandler from "./WBTokenLoaderHandler.js";
import reportLoaderHandler from "./reportLoaderHandler.js";
import WBTokenRemoveButtonHandler from "./WBTokenRemoveButtonHandler.js";

buildReportTree();
//fileUploadHandler();
reportLoaderHandler();
WBTokenLoaderHandler();
WBTokenRemoveButtonHandler();
