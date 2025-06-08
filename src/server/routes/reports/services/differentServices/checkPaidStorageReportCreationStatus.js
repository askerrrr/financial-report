var getCreationStatus = async (url, token) => {
  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  var result = await res.json();

  var { status } = result?.data;

  return status;
};

var checkPaidStorageReportCreationStatus = async (taskId, token) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`;

  var status = await getCreationStatus(url, token);

  if (status !== "done") {
    return await new Promise((resolve, reject) => {
      var count = 0;

      var timerId = setInterval(async () => {
        var status = await getCreationStatus(url, token);

        if (status === "done") {
          clearInterval(timerId);
          resolve(true);
        }

        if (count > 1) {
          clearInterval(timerId);
          reject(false);
        }

        ++count;
      }, 5000);
    });
  }

  return true;
};

module.exports = checkPaidStorageReportCreationStatus;
