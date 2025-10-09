import openWBTokenLoader from "./services/WBTokenLoader/index.js";

var WBTokenLoaderHandler = async () => (document.getElementById("token-button").onclick = async () => await openWBTokenLoader());

export default WBTokenLoaderHandler;
