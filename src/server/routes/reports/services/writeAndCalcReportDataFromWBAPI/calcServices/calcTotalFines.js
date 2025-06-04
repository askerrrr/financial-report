var calcTotalFines = async (data) => {
  var totalFines = data.reduce((acc, i) => acc + i.penalty, 0);

  return totalFines;
};

module.exports = calcTotalFines;
