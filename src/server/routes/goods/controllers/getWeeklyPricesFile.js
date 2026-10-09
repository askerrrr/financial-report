import getWeeklyPricesFileService from "../services/getWeeklyPricesFile.js";

var getWeeklyPricesFileController = async (req, res, next) => {
  return res.json({ msg: "Скоро будет доступно" });
  var { userId } = req.params;

  var { buffer } = await getWeeklyPricesFileService(userId);

  res.set({
    "Content-Disposition": 'attachment; filename="weeklyPrices.xlsx"',
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return res.send(buffer);
};

export default getWeeklyPricesFileController;
