import openTokenEditModal from "./services/tokenEditModal/index.js";

var tokenHandler = async () => {
  var button = document.getElementById("token-button");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    await openTokenEditModal();
  });
};

export default tokenHandler;
