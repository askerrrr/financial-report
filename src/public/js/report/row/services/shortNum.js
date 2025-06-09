var shortNum = (num) => {
  var str = num + "";

  var [start, end] = str.split(".");

  return [start, end.slice(0, 3)].join(".");
};

export default shortNum;
