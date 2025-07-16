var getCookieValueByName = async (name) => {
  var cookies = document.cookie.split(";").map((e) => e.trim());

  var cookie = cookies.find((e) => e.startsWith(name));

  var cookieValue = cookie.split("=")[1];

  return cookieValue;
};

export default getCookieValueByName;
