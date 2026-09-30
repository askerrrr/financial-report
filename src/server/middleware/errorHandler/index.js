import { MulterError } from "multer";
import { errorLogger } from "../../../logger.js";
import { WBAPIError } from "../../customError/index.js";

var errorHandler = async (err, req, res, next) => {
  errorLogger.fatal({ err });

  if (err instanceof MulterError) {
    return res.sendStatus(500);
  }

  if (err instanceof WBAPIError) {
    return res.status(err.status).json({ msg: err.message });
  }

  res.status(err?.status || 500).json({ msg: "Произошла ошибка..." });
};

export default errorHandler;
