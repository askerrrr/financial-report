import createDiv from "./createDiv.js";
import createLabel from "./createLabel.js";
import createInput from "./createInput.js";

var weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

var peekWeek = () => {
  var fieldset = document.createElement("fieldset");

  var input = createInput(7, "checkbox", "На всю неделю", "checkbox");
  input.checked = true;
  var label = createLabel(input, "На всю неделю", "wrapinput - yes");
  var div = createDiv();
  div.append(input, label);

  var legeng = document.createElement("legend");
  legeng.append("Установить цену на");

  fieldset.append(legeng, div);

  var i = 0;
  for (var day of weekDays) {
    input = createInput(i, "checkbox", day, "checkbox");
    label = createLabel(input, day, "wrapinput - yes");
    div = createDiv();
    div.append(input, label);

    fieldset.append(div);

    i++;
  }

  return fieldset;
};

export default peekWeek;
