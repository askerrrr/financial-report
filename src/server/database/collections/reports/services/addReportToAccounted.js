var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var addReportToAccounted = async (collection, userId, reportId, newStatus) => {
  if (newStatus === true) {
    return await collection.updateMany({ userId, "reports.reportId": reportId }, [
      {
        $set: {
          reports: {
            $map: {
              input: "$reports",
              as: "report",
              in: {
                $cond: {
                  if: { $eq: ["$$report.reportId", reportId] },
                  then: {
                    $mergeObjects: ["$$report", { isFinancesAccounted: true }],
                  },
                  else: "$$report",
                },
              },
            },
          },
          "temp.targetReport": {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$reports",
                  as: "report",
                  cond: { $eq: ["$$report.reportId", reportId] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $set: {
          reportsWithAccountedFinances: {
            $concatArrays: [
              { $ifNull: ["$reportsWithAccountedFinances", []] },
              [
                {
                  userId,
                  reportId,
                  dateFrom: "$temp.targetReport.dateFrom",
                  dateTo: "$temp.targetReport.dateTo",
                  tax: "$temp.targetReport.totalTaxAmount",
                  profit: "$temp.targetReport.totalFinalProfit",
                  margin: "$temp.targetReport.totalProfitMargin",
                  productCosts: "$temp.targetReport.totalProductCosts",
                  insuranceFee: "$temp.targetReport.totalInsuranceFee",
                  additionalInsuranceFee: "$temp.targetReport.totalAdditionalInsuranceFee",
                  financesAccountedAt: Date.now() + mskTimeOffsetInMs,
                },
              ],
            ],
          },
        },
      },
      { $unset: "temp" },
    ]);
  } else {
    return await collection.updateOne(
      { userId, "reports.reportId": reportId },
      { $set: { "reports.$.isFinancesAccounted": false }, $pull: { reportsWithAccountedFinances: { reportId } } },
    );
  }
};

export default addReportToAccounted;
