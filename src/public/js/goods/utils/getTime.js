var getTime = (fullTime, title) => {
  if (!fullTime) {
    return "";
  }

  var time = fullTime?.split("T")[1]?.split(".")[0];
  return title + time;
};

export default getTime;
