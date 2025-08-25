var createTitle = async () => {
  var title = document.createElement("h3");
  title.append("Введите токен");
  title.className = "modal-title";

  return title;
};

export default createTitle;
