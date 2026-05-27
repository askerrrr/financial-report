import openTokenLoaderModal from "./tokenLoaderModal/index.js";

var loadTokenButton = document.getElementById("token-button");

var loadTokenButtonHander = () => (loadTokenButton.onclick = () => openTokenLoaderModal());

export default loadTokenButtonHander;
