import { Router } from "express";
import getReports from "./controllers/getReports.js";
import getMainPage from "./controllers/getMainPage.js";
import getLastReportsAndTree from "./controllers/getLastReportsAndTree.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getMainPage);
router.get("/api/:userId", getLastReportsAndTree);
router.post("/api/required-reports/", getReports);

export default router;
