import Joi from "joi";

var schema = Joi.object({ login: Joi.string().required(), passwd: Joi.any().required() });

var checkAuthAdminData = async (req, res, next) => {
  var { login, passwd } = req.body;
};

export default checkAuthAdminData;
