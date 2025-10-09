import openWBTokenLoader from "./services/WBTokenLoader/index.js";

var tokenHandler = async () => {
  var button = document.getElementById("token-button");

  button.onclick = async () => await openWBTokenLoader();
};

export default tokenHandler;
