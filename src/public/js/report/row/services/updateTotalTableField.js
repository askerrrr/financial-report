var updateTotalTableField = async (data) => {
  for (var elem of Object.keys(data)) {
    document.getElementById(elem).textContent = data[elem];
  }
};

export default updateTotalTableField;
