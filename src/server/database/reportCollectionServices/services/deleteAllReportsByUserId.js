var deleteAllReportsByUserId = async (collection, userId) => {
  var result = collection.updateOne(
    { userId },
    {
      $set: { reports: [] },
    }
  );

  return result.modifiedCount;
};

module.exports = deleteAllReportsByUserId;
