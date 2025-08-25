var { DatabaseError } = require("../../../../customError");

var deleteReportFromReportTree = async (collection, userId, year, month, reportId) => {
  try {
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
        arrayFilters: [{ "y.year": year }, { "m.month": month }, { "r.reportId": reportId }],
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = deleteReportFromReportTree;
