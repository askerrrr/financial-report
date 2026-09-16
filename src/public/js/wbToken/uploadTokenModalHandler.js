import createTokenLoaderModal from "./createTokenLoaderModal.js";

var uploadBtn = document.getElementById("open-upload-token-modal");

var uploadTokenModalHandler = (userId) =>
  (uploadBtn.onclick = () => createTokenLoaderModal(userId));

export default uploadTokenModalHandler;
