var checkWBTokenExists = async (userId) => {
  var res = await fetch("/token/exist/" + userId);

  var { tokenIsExists } = await res.json();

  return tokenIsExists;
};

export default checkWBTokenExists;
