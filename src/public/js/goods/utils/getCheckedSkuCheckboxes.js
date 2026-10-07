var getCheckedSkuCheckboxes = (tbodyID) => {
  var checkboxesAttribute = tbodyID === "enabled-skus-tbody" ? "enbl" : "dsbl";

  var checkedCheckboxes = document.querySelectorAll(
    `input.${checkboxesAttribute}:checked`,
  );

  console.log(checkedCheckboxes.length);
};

export default getCheckedSkuCheckboxes;
