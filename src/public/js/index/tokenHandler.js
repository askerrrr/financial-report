import openTokenEditModal from "./services/openTokenEditModal.js";

var tokenHandler = async () => {
  var button = document.getElementById("token-button");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    await openTokenEditModal();
  });
};

tokenHandler();
