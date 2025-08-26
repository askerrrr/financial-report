var standardizeDate = async (date) => {
  var [year, mounth, day] = date.split(".").map(Number);

  if (year < 2024 || year > new Date().getFullYear()) {
    return;
  }

  if (mounth < 1 || mounth > 12) {
    return;
  }

  if (mounth > 0 && mounth < 10) {
    mounth = "0" + mounth;
  }

  if (day < 1 || day > 31) {
    return;
  }

  if (day > 0 && day < 10) {
    day = "0" + day;
  }

  return [year, mounth, day].join("-");
};

export default standardizeDate;
