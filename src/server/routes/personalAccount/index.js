import { Router } from "express";

import resetUserData from "./controllers/resetUserData.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/", resetUserData);

export default router;
