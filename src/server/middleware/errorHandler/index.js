import { MulterError } from "multer";
import { errorLogger } from "../../../logger.js";
import { WBAPIError } from "../../customError/index.js";

var errorHandler = async (err, req, res, next) => {
  errorLogger.fatal({ err });

  if (e instanceof MulterError) {
    return res.sendStatus(500);
  }

  if (e instanceof WBAPIError) {
    return res.status(e.status).json({ msg: e.message });
  }

  res.status(e?.status || 500).json({ msg: "Произошла ошибка..." });
};

export default errorHandler;
