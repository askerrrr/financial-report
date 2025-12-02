var sum = (report, filedName) => report.reduce((acc, i) => acc + i[filedName], 0);

module.exports = sum;
