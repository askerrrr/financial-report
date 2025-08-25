var getTaxParams = async () => {
  var res = await fetch("/tax_params/api");

  var { taxParams } = await res.json();

  return taxParams;
};

export default getTaxParams;
