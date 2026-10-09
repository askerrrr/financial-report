var isSunday = (dateString) => {
  var [year, month, day] = dateString.split("-").map(Number);
  var date = new Date(year, month - 1, day);
  return date.getDay() === 0;
};

export default isSunday;
