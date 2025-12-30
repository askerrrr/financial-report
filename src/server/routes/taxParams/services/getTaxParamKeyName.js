var getTaxParamKeyName = (data) => {
  var taxParamKeyName = Object.keys(data)[0];
  return { taxParamKeyName };
};

module.exports = getTaxParamKeyName;
