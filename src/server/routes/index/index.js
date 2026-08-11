import { Router } from "express";
import logout from "./controllers/logout.js";
import getReports from "./controllers/getReports.js";
import getMainPage from "./controllers/getMainPage.js";
import getMainPageData from "./controllers/getMainPageData.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getMainPage);
router.post("/logout", logout);
router.get("/api/:userId", getMainPageData);
router.post("/api/required-reports/", getReports);

export default router;
