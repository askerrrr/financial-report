var getNextMonday = (dateFrom) => {
  var date = new Date(dateFrom);

  date.setDate(date.getDate() + 7);

  var nextMonday = date.toISOString().slice(0, 10);

  return { nextMonday };
};

export default getNextMonday;
