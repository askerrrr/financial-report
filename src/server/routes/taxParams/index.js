import { Router } from "express";
import getTaxParams from "./controllers/getTaxParams.js";
import getReportYears from "./controllers/getReportYears.js";
import changeTaxParams from "./controllers/changeTaxParams.js";
import getTaxParamsPage from "./controllers/getTaxParamsPage.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";

import changeTaxParamsControllerSchema from "./joiSchemas/changeTaxParams-controller-schema.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getTaxParamsPage);

router.get("/api", getTaxParams);

router.get("/years", getReportYears);

router.post("/", joiSchemaValidator(changeTaxParamsControllerSchema), changeTaxParams);

export default router;
