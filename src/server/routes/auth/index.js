import { Router } from "express";
import getAuthFormPage from "./controllers/getAuthFormPage.js";
import checkUserCredentials from "./controllers/checkUserCredentials.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getAuthFormPage);

router.post("/", checkUserCredentials);

export default router;
