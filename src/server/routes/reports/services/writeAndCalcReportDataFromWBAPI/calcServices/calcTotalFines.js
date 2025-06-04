var calcTotalFines = async (data) => {
  var totalFiles = data.reduce((acc, i) => acc + i.penalty, 0);

  return totalFiles;
};

module.exports = calcTotalFines;
