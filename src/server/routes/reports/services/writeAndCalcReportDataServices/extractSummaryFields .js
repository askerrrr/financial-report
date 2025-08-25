var extractSummaryFields = async (data) => {
  var { summaryData, ...rest } = data;

  return { ...rest, ...summaryData };
};

module.exports = extractSummaryFields;
