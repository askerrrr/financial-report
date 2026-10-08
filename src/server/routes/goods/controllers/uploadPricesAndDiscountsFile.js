import uploadPricesAndDiscountsFileService from "../services/uploadPricesAndDiscountsFile.js";

var uploadPricesAndDiscountsFileController = async (req, res, next) => {
  var userId = req.body.userId;
  var fileBuffer = req.file.buffer;

  var { userNotFound, listGoodsIsEmpty, weeklyPricesAndDiscounts } =
    await uploadPricesAndDiscountsFileService(userId, fileBuffer);

  var infoText = "";

  if (userNotFound) {
    infoText = "Нет пользователя с таким ID";
  }

  if (listGoodsIsEmpty) {
    infoText =
      "Не удалось установить цены не неделю.\nНеобходимо загрузить товары.";
  }

  return res.json({ infoText, weeklyPricesAndDiscounts });
};

export default uploadPricesAndDiscountsFileController;
