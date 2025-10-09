var sendWBAuthToken = async (token) => {
  var res = await fetch("/token", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 304) {
    alert("Токен совпадает с предыдущим");
    return;
  }

  if (res.status === 500) {
    alert("Произошла ошибка при сохранении токена...");
    return;
  }

  return true;
};

export default sendWBAuthToken;
