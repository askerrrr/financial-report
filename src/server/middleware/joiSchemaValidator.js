var joiSchemaValidator =
  (schema, needToValidateReqParams = false) =>
  (req, res, next) => {
    if (needToValidateReqParams) {
      if (!req.params) {
        return res.sendStatus(400);
      }
      var { error } = schema.validate(req.params);
    } else {
      if (!req.body) {
        return res.sendStatus(400);
      }
      var { error } = schema.validate(req.body);
    }

    if (error) {
      console.error("JOI_SCHEMA_VALIDATION_ERROR", "\n", error);
      return res.sendStatus(400);
    }

    next();
  };

export default joiSchemaValidator;
