var conversionToNumberOrString = (data) =>
  data.map((i) => (isNaN(+i) ? i : +i));

module.exports = conversionToNumberOrString;
