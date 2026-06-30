var yes = "да";
var no = "нет";
var userId = document.cookie.split("=")[1];

var createCheckboxForParticipationInPromo = (sku, changePriceIfInPromo, needWrapIntoFieldset = false) => {
  var { skuName } = sku;

  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = "checkbox-" + skuName;

  var label = document.createElement("label");
  label.htmlFor = "checkbox-" + skuName;
  label.className = skuName;
  label.textContent = changePriceIfInPromo ? yes : no;

  input.addEventListener("click", async (e) => {
    var newtextContent = input.checked ? yes : no;
    var labels = document.querySelectorAll("." + skuName);
    labels.forEach((label) => (label.textContent = newtextContent));
  });

  var div = document.createElement("div");
  div.append(input, label);

  if (needWrapIntoFieldset) {
    var legend = document.createElement("legend");
    legend.append("Изменить цену если в акции");

    var fieldset = document.createElement("fieldset");
    fieldset.append(legend, div);
    return fieldset;
  } else {
    return div;
  }
};

export default createCheckboxForParticipationInPromo;
