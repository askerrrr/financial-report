import { join } from "node:path";

var getReportFieldsDescriptionPageController = async (req, res) =>
  res.sendFile(
    join(
      import.meta.dirname,
      "../../../../public/html/reportFieldsDescription/index.html",
    ),
  );

export default getReportFieldsDescriptionPageController;
