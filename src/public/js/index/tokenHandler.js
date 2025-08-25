import openTokenEditModal from "./services/tokenEditModal/index.js";

var tokenHandler = async () => {
  var button = document.getElementById("token-button");

  button.onclick = async () => await openTokenEditModal();
};

export default tokenHandler;
