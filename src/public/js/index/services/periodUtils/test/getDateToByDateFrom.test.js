import { test, expect } from "@jest/globals";
import getDateToByDateFrom from "../index.js";

test("getDateToByDateFrom('2025-04-14)", async () => expect(await getDateToByDateFrom("2025-04-14")).toBe("2025.04.20"));
test("getDateToByDateFrom(2025-04-28)", async () => expect(await getDateToByDateFrom("2025-04-28")).toBe("2025.05.04"));
test("getDateToByDateFrom(2025-09-01)", async () => expect(await getDateToByDateFrom("2025-09-01")).toBe("2025.09.07"));
test("getDateToByDateFrom('2025-04-21)", async () => expect(await getDateToByDateFrom("2025-04-21")).toBe("2025.04.27"));
test("getDateToByDateFrom(2025-09-29)", async () => expect(await getDateToByDateFrom("2025-09-29")).toBe("2025.10.05"));
test("getDateToByDateFrom(2025-09-22)", async () => expect(await getDateToByDateFrom("2025-09-22")).toBe("2025.09.28"));
test("getDateToByDateFrom('2025-07-28)", async () => expect(await getDateToByDateFrom("2025-07-28")).toBe("2025.08.03"));
test("getDateToByDateFrom(2025-08-25)", async () => expect(await getDateToByDateFrom("2025-08-25")).toBe("2025.08.31"));
// test("getDateToByDateFrom(2025-09-01)", async () => expect(await getDateToByDateFrom("2025-09-01")).toBe("2025.09.07"));
// test("getDateToByDateFrom('2025-04-14)", async () => expect(await getDateToByDateFrom("2025-04-14")).toBe("2025.04.20"));
// test("getDateToByDateFrom(2025-04-28)", async () => expect(await getDateToByDateFrom("2025-04-28")).toBe("2025.05.04"));
// test("getDateToByDateFrom(2025-09-01)", async () => expect(await getDateToByDateFrom("2025-09-01")).toBe("2025.09.07"));
