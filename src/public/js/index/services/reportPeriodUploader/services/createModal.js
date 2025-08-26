var createModal = async (className) => {
  var modal = document.createElement("div");
  modal.className = className;

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };

  return modal;
};

export default createModal;
