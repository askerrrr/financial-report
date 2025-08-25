var calcTotalFines = async (data) => {
  var totalFines = data.fines.reduce((acc, i) => acc + i, 0);

  return totalFines;
};

module.exports = calcTotalFines;
