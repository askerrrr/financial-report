import { join } from "node:path";

var temporarilyUnavailableHandler = async (req, res) =>
  res.sendFile(
    join(
      import.meta.dirname,
      "../../../public/html/temporarilyUnavailableHandler.html",
    ),
  );

export default temporarilyUnavailableHandler;
