import { Router } from "express";
import getAdminMainPage from "./controllers/getAdminMainPage.js";
import getAdminAuthPage from "./controllers/getAdminAuthPage.js";
import checkAuthAdminData from "./controllers/checkAuthAdminData.js";
import getAdminMainPageData from "./controllers/getAdminMainPageData.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAdminMainPage);
router.get("/api", getAdminMainPageData);
router.get("/auth", getAdminAuthPage);
router.post("/", checkAuthAdminData);

export default router;
