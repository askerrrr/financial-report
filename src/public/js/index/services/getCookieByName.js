var getCookieByName = async (data) => {
  var cookies = "userId=fe6576b643636ad76bdc; reportId=b3fd995d25d575b641b2";

  cookies = cookies.split(";").map((e) => e.trim());

  var cookie = cookies.find((e) => e.startsWith(data));

  var cookieValue = cookie.split("=")[1];

  return cookieValue;
};

export default getCookieByName;
