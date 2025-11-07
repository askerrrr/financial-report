var getCurrentDayMSK = () => {
  var formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    weekday: "long",
  });

  return { currentDayName: formatter.format(new Date()) };
};

export default getCurrentDayMSK;
