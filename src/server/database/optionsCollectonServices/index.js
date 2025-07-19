var { optionsCollection } = require("../connection/");

var optionsCollectonServices = {
  createOptionsEntity: (userId) =>
    createOptionsEntity(optionsCollection, userId),
};

module.exports = optionsCollectonServices;
