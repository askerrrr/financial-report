import getTokenData from "./getTokenData.js";
import createTokenCard from "./tokenCard/createTokenCard.js";
import uploadTokenModalHandler from "./uploadTokenModalHandler.js";

var userId = document.cookie.split("=")[1];
var tokenCount = document.getElementById("token-count");
var tokenCardContainer = document.getElementById("token-card-container");

var main = async () => {
  var { tokensDetails } = await getTokenData(userId);

  tokenCount.textContent = `(${tokensDetails.length})`;
  tokensDetails.forEach((token) => {
    var { tokenCard } = createTokenCard(userId, token);
    tokenCardContainer.append(tokenCard);
  });

  uploadTokenModalHandler(userId);
};

main();
