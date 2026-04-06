import { Router } from "express";
import createUser from "./controller/createUser.js";
import getRegistrationFormPage from "./controller/getRegistrationFormPage.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/", getRegistrationFormPage);

router.post("/new", createUser);

export default router;
