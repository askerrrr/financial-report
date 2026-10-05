var everyIsNum = (date) => {
  var parts = date.split("-");

  return parts.map(Number).every(Number.isFinite);
};
export default everyIsNum;
