import { Router } from "express";
import schemas from "./JoiSchemas/index.js";
import setCostPrice from "./controllers/setCostPrice.js";
import getReportPage from "./controllers/getReportPage.js";
import tokenValidator from "./controllers/tokenValidator.js";
import getReportFromWBAPI from "./controllers/getReportFromWBAPI.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import downloadReportAsXLSX from "./controllers/downloadReportAsXLSX.js";
import getDecodeReportWithoutRegistrationPage from "./controllers/getDecodeReportWithoutRegistrationPage.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getDecodeReportWithoutRegistrationPage);

router.get("/report/:id", getReportPage);

router.post("/xlsx/", downloadReportAsXLSX);

router.post("/", getReportFromWBAPI);

router.patch("/report/cost-price", joiSchemaValidator(schemas.setCostPrice), setCostPrice);

router.post("/token/", tokenValidator);

export default router;
