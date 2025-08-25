var createModal = async () => {
  var modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  return modal;
};

export default createModal;
