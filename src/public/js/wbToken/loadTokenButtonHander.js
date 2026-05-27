import openTokenLoaderModal from "./openTokenLoaderModal.js";

var loadTokenButton = document.getElementById("token-button");

var loadTokenButtonHander = () => (loadTokenButton.onclick = () => openTokenLoaderModal());

export default loadTokenButtonHander;
