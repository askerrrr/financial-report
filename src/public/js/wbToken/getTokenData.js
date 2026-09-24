var url = "/wbtoken/";

var getTokenData = async (userId) => {
  var res = await fetch(url + userId);

  var { tokensDetails } = await res.json();

  return { tokensDetails };
};

export default getTokenData;
