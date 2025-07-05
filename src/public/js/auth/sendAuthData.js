var sendAuthData = async (data) => {
  var res = await fetch("/auth/check", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export default sendAuthData;
