var showLoader = async () => {
  var overlay = document.createElement("div");
  overlay.className = "loader-overlay";

  var loader = document.createElement("span");
  loader.id = "loader";
  loader.className = "loader";

  overlay.appendChild(loader);
  document.body.appendChild(overlay);
};

var deleteLoader = async () => {
  var overlay = document.querySelector(".loader-overlay");

  if (overlay) {
    overlay.remove();
  }
};

export { showLoader, deleteLoader };
