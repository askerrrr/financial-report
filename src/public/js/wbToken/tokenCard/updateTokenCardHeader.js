export var updateTokenCardHeader = (type, ending) => {
  var tokenNameGroubElem = document.getElementById("token-name-group" + ending);

  var tokenNameElem = document.createElement("div");

  var tokenTypeBadge = document.createElement("div");

  tokenTypeBadge.textContent = type === "read" ? "чтение" : "чтение и запись";

  tokenNameGroubElem.append(tokenNameElem);

  var tokenCardHeader = document.createElement("div");
  tokenCardHeader.className = "token-header";

  tokenCardHeader.append(tokenNameGroubElem, tokenTypeBadge);

  return { tokenCardHeader };
};
