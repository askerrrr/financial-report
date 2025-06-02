var checkWBTokenExists = async () => {
  var res = await fetch("/token/exist");

  var { tokenIsExists } = await res.json();

  return tokenIsExists;
};

export default checkWBTokenExists;
