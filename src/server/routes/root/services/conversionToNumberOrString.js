var conversionToNumberOrString = (data) => {
  if (data.every((i) => typeof +i == "number")) {
    var numData = data.map((i) => +i);

    return numData;
  }

  return data;
};

module.exports = conversionToNumberOrString;
