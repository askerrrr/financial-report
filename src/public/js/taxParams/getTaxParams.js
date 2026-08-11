var getTaxParams = async (userId) => {
  var res = await fetch("/tax-params/api/" + userId);

  var { taxParams } = await res.json();

  return { taxParams };
};

export default getTaxParams;
