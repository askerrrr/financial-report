var sendWBAuthToken = async (token) => {
  var res = await fetch("/token", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

export default sendWBAuthToken;
