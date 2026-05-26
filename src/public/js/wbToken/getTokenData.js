var url = "/wbtoken/";

var getTokenData = async (userId) => {
  var res = await fetch(url + userId);

  var { data } = await res.json();
  return { data };
};

export default getTokenData;
