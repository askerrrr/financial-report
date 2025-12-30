var { DatabaseError } = require("../../../../customError");

var getReportsByUserId = async (collection, userId, session, projectQueries, reportIds) => {
  try {
    if (reportIds) {
      var projectFields = {};

      projectQueries.map((field) => {
        var key = field.split(".")[1];
        projectFields[key] = "$$r." + key;
      });

      var data = await collection.aggregate([
        {
          $match: {
            userId,
            "reports.reportId": { $in: reportIds },
          },
        },
        {
          $project: {
            reports: {
              $map: {
                input: {
                  $filter: {
                    input: "$reports",
                    cond: { $in: ["$$this.reportId", reportIds] },
                  },
                },
                as: "r",
                in: projectFields,
              },
            },
          },
        },
      ]);

      return { reports: data[0].reports };
    }

    if (projectQueries) {
      var { reports } = await collection.findOne({ userId }).select(projectQueries);

      return { reports };
    }

    var data = await collection.findOne({ userId }, null, { session, session });

    return { reports: data.toObject().reports };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};
module.exports = getReportsByUserId;
