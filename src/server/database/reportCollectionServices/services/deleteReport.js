var deleteReport = async (collection, userId, reportId) => {
  var result = await collection.updateOne(
    { userId },
    {
      $pull: { reports: { reportId } },
    }
  );

  return result.modifiedCount;
};

module.exports = deleteReport;
