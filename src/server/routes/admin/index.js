import { Router } from "express";
import getAdminAuthPage from "./controllers/getAdminAuthPage.js";
import checkAuthAdminData from "./controllers/checkAuthAdminData.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAdminAuthPage);
router.post("/", checkAuthAdminData);

export default router;
