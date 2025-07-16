var deleteReportFromReportTree = async (
  collection,
  userId,
  year,
  month,
  reportId
) => {
  var result = await collection.updateOne(
    {
      userId,
      "years.year": year,
      "years.months.month": month,
      "years.months.reportIds.reportId": reportId,
    },
    {
      $set: {
        "years.$[y].months.$[m].reportIds.$[r]": null,
      },
    },
    {
      arrayFilters: [
        { "y.year": year },
        { "m.month": month },
        { "r.reportId": reportId },
      ],
    }
  );

  return result.modifiedCount;
};

module.exports = deleteReportFromReportTree;
