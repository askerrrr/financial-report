import createTokenLoaderModal from "../createTokenLoaderModal.js";

export var uploadTokenModalHandler = (userId) => {
  var uploadBtn = document.getElementById("open-upload-token-modal");

  uploadBtn.onclick = () => createTokenLoaderModal(userId);
};
