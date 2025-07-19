var { optionsCollection } = require("../connection/");
var createOptionsEntity = require("./services/createOptionsEntity");

var optionsCollectonServices = {
  createOptionsEntity: (userId) =>
    createOptionsEntity(optionsCollection, userId),
};

module.exports = optionsCollectonServices;
