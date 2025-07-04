var createTitle = async () => {
  var title = document.createElement("h3");
  title.append("Введите период отчета");
  title.className = "modal-title";

  return title;
};

export default createTitle;
