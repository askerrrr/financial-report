var getReportsByUserId = async (collection, userId, session, selectedFields, reportIds) => {
  if (reportIds) {
    var projectFields = {};

    selectedFields.map((field) => {
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
          reportsWithAccountedFinances: 1,
        },
      },
    ]);
    
    return { reports: data[0].reports, reportsWithAccountedFinances: data[0].reportsWithAccountedFinances };
  }

  if (selectedFields) {
    var { reports } = await collection.findOne({ userId }).select(selectedFields);

    return { reports };
  }

  var data = await collection.findOne({ userId }, null, { session, session });

  return { reports: data.toObject().reports };
};
export default getReportsByUserId;
