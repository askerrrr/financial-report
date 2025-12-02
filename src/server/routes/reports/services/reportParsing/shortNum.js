var hasDot = (num) => String(num).split("").includes(".");

Number.prototype.truncate = function () {
  if (hasDot(this)) {
    return +this.toFixed(2);
  }

  return this;
};

var shortNum = (n) => {
  var hasDot = String(n).split("").includes(".");

  if (!hasDot) {
    return n;
  }

  return +n.toFixed(2);
};

module.exports = shortNum;
