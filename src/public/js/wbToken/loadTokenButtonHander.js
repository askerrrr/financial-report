import openTokenLoaderModal from "./openTokenLoaderModal.js";

var loadTokenButton = document.getElementById("token-button");

var loadTokenButtonHander = (userId) => (loadTokenButton.onclick = () => openTokenLoaderModal(userId));

export default loadTokenButtonHander;
