import getTokenData from "./getTokenData.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { tokenData } = await getTokenData(userId);
};

main();
