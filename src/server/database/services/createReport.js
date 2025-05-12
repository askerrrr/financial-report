var createReport = async (collection, userId, report) => {
  var result = await collection.updateOne(
    { userId },
    {
      $push: {
        reports: { ...report },
      },
    }
  );

  return result.acknowledged;
};

module.exports = createReport;
