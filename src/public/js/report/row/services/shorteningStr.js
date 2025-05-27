var shorteningStr = (str) => {
  var [start, end] = str.split(".");

  return start + "." + end.slice(0, 3);
};

export default shorteningStr;
