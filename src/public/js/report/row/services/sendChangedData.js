var sendChangedData = async (data) => {
  var res = await fetch(data.url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return alert("Не удалось изменить данные");
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
