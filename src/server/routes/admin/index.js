import { Router } from "express";
import getAdminMainPage from "./controllers/getAdminMainPage.js";
import getAdminAuthPage from "./controllers/getAdminAuthPage.js";
import checkAuthAdminData from "./controllers/checkAuthAdminData.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAdminMainPage);
router.get("/auth", getAdminAuthPage);
router.post("/", checkAuthAdminData);

export default router;
