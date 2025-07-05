var isMonday = (dateFrom, mondays) =>
  mondays.includes(new Date(dateFrom).toISOString());

export default isMonday;
