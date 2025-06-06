var getPaidStorageReportByPeriod = async (taskId, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download?`;

  var res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new WBAPIError(userId, res.status, res.statusText);
  }

  var paidStorageReport = await res.json();

  return paidStorageReport;
};

module.exports = getPaidStorageReportByPeriod;
