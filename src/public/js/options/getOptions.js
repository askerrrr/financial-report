var getOptions = async () => {
  var res = await fetch("/options/api");

  var { options } = await res.json();

  return options;
};

export default getOptions;
