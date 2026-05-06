import { Router } from "express";
import checkAuth from "./controllers/checkAuth.js";
import updateDataIntoListGoods from "./controllers/updateDataIntoListGoods.js";
import uploadToWBAPITodayPricesAndDiscounts from "./controllers/uploadToWBAPITodayPricesAndDiscounts.js";
import checkProcessingOfPricesAndDiscounts from "./controllers/checkProcessingOfPricesAndDiscounts.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/upload-new-prices-discounts", checkAuth, uploadToWBAPITodayPricesAndDiscounts);

router.post("/get-current-prices-discounts", checkAuth, updateDataIntoListGoods);

router.post("/check-processing-of-prices-discounts", checkAuth, checkProcessingOfPricesAndDiscounts);

export default router;
