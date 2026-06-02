var getMainPageData = async (userId) => {
  var res = await fetch("/api/" + userId);

  if (!res.ok) {
    return alert("Не удалось загрузить отчеты");
  }

  var reportData = await res.json();

  return reportData;
};

export default getMainPageData;
