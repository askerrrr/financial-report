export var removeTokenCard = (tokenCardId) => {
  var tokenCard = document.getElementById(tokenCardId);

  if (tokenCard) {
    tokenCard.remove();
  }
};
