var isMonday = (date) => {
  var date = new Date(date);

  return date.getDay() === 1;
};

export default isMonday;
