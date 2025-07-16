import getCookieValueByName from "../getCookieValueByName.js";

var userId = await getCookieValueByName("userId");

var sendWBAuthToken = async (token) => {
  var res = await fetch("/token", {
    method: "POST",
    body: JSON.stringify({ userId, token }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

export default sendWBAuthToken;
