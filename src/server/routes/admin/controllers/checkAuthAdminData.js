var Joi = require("joi");

var schema = Joi.object({ login: Joi.string().required(), passwd: Joi.any().required() });

var checkAuthAdminData = async (req, res, next) => {
  var { login, passwd } = req.body;
};

module.exports = checkAuthAdminData;
