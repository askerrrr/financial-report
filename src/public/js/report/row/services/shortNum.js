var shortNum = async (num) => {
  var str = num + "";

  var strIncludesDot = str.split("").includes(".");

  if (!strIncludesDot) {
    return +str;
  }

  var [start, end] = str.split(".");

  return [start, end.slice(0, 3)].join(".");
};

export default shortNum;
