var getOptions = async () => {
  var res = await fetch("/tax_params/api");

  var { options } = await res.json();

  return options;
};

export default getOptions;
