import { Router } from "express";
import checkAuth from "./controllers/checkAuth.js";
import updateDataIntoListGoods from "./controllers/updateDataIntoListGoods.js";
import uploadTodayPricesAndDiscounts from "./controllers/uploadTodayPricesAndDiscounts.js";
import checkProcessingOfPricesAndDiscounts from "./controllers/checkProcessingOfPricesAndDiscounts.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/upload-new-prices-discounts", checkAuth, uploadTodayPricesAndDiscounts);

router.post("/get-current-prices-discounts", checkAuth, updateDataIntoListGoods);

router.post("/check-processing-of-prices-discounts", checkAuth, checkProcessingOfPricesAndDiscounts);

export default router;
