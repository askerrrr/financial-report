var createThElement = async (data) => {
  var th = document.createElement("th");

  th.append(data);

  return th;
};

export default createThElement;
