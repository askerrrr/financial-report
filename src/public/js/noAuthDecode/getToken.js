var urls = [
  { url: "https://advert-api.wildberries.ru/ping", category: "Маркетинг" },
  { url: "https://statistics-api.wildberries.ru/ping", category: "Статистика" },
  { url: "https://seller-analytics-api.wildberries.ru/ping", category: "Аналитика" },
];

var getStatus = async (url, token) => {
  var res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
  });

  var { Status } = await res.json();

  return { Status };
};

var getToken = async () =>
  new Promise(async (resolve, reject) => {
    var token = document.getElementById("token").value;
    var failedStatuses = [];

    await Promise.all(
      urls.map(async (item) => {
        var { url, category } = item;

        var { Status } = await getStatus(url, token);

        if (Status !== "OK") {
          failedStatuses.push(category);
        }
      })
    );

    if (failedStatuses.length === 0) {
      resolve({ token });
    } else {
      alert("В токене отсутствует категория:" + "\n- " + failedStatuses.join("\n- "));
      reject(new Error("Invalid token categories"));
    }
  });

export default getToken;
