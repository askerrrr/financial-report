var weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

var peekWeek = () => {
  var select = document.createElement("select");

  var options = document.createElement("option");
  options.label = "На каждый день (По умолчанию)";
  select.append(options);
  select.size = 3;

  for (var i of weekDays) {
    options = document.createElement("option");
    options.label = i;

    select.append(options);
  }
  select.multiple = true;

  var labelText = document.createElement("span");
  labelText.className = "label-text";
  labelText.textContent; //= "Установить цену на";
  var label = document.createElement("label");
  label.append(labelText, select);

  return label;
};

export default peekWeek;
