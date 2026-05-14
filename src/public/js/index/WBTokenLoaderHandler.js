import openWBTokenLoader from "./services/WBTokenLoader/index.js";

var WBTokenLoaderHandler = () => (document.getElementById("token-button").onclick = () => openWBTokenLoader());

export default WBTokenLoaderHandler;
