import { Router } from "express";
import deleteUser from "./controllers/deleteUser.js";
import deleteUsers from "./controllers/deleteUsers.js";

var router = Router({ caseSensitive: true, strict: true });

router.delete("/user", deleteUser);
router.delete("/users", deleteUsers);

export default router;
