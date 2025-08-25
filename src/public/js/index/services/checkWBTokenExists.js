var checkWBTokenExists = async () => {
  var res = await fetch("/token/exist");

  if (res.status === 404) {
    return;
  }

  return true;
};

export default checkWBTokenExists;
