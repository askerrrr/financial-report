var getTime = (fullTime) => {
  var time = fullTime?.split("T")[1]?.split(".")[0];
  return time;
};

export default getTime;
