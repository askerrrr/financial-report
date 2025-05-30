import openModal from "./services/openModal.js";

var tokenHandler = async () => {
  var button = document.getElementById("token-button");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    await openModal();
  });
};

tokenHandler();
