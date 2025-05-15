var createReport = async (collection, userId, report) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $push: {
          reports: { ...report },
        },
      }
    );

    return result.acknowledged;
  } catch (e) {}
};

module.exports = createReport;
