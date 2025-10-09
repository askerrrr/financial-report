import buildReportTree from "./buildReportTree.js";
import fileUploadHandler from "./fileUploadHandler.js";
import WBTokenLoaderHandler from "./WBTokenLoaderHandler.js";
import reportLoaderHandler from "./reportLoaderHandler.js";

WBTokenLoaderHandler();
buildReportTree();
//fileUploadHandler();
reportLoaderHandler();
