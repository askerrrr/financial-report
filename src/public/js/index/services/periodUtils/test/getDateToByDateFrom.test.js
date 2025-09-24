import { test, expect } from "@jest/globals";
import getDateToByDateFrom from "../index.js";

//2025

test("getDateToByDateFrom('2025-04-14)", async () => expect(await getDateToByDateFrom("2025-04-14")).toBe("2025-04-20"));
test("getDateToByDateFrom(2025-04-28)", async () => expect(await getDateToByDateFrom("2025-04-28")).toBe("2025-05-04"));
test("getDateToByDateFrom(2025-09-01)", async () => expect(await getDateToByDateFrom("2025-09-01")).toBe("2025-09-07"));
test("getDateToByDateFrom('2025-04-21)", async () => expect(await getDateToByDateFrom("2025-04-21")).toBe("2025-04-27"));
test("getDateToByDateFrom(2025-09-29)", async () => expect(await getDateToByDateFrom("2025-09-29")).toBe("2025-10-05"));
test("getDateToByDateFrom(2025-09-22)", async () => expect(await getDateToByDateFrom("2025-09-22")).toBe("2025-09-28"));
test("getDateToByDateFrom('2025-07-28)", async () => expect(await getDateToByDateFrom("2025-07-28")).toBe("2025-08-03"));
test("getDateToByDateFrom(2025-08-25)", async () => expect(await getDateToByDateFrom("2025-08-25")).toBe("2025-08-31"));
test("getDateToByDateFrom(2025-09-01)", async () => expect(await getDateToByDateFrom("2025-09-01")).toBe("2025-09-07"));
test("getDateToByDateFrom('2025-04-14)", async () => expect(await getDateToByDateFrom("2025-04-14")).toBe("2025-04-20"));
test("getDateToByDateFrom(2025-09-01)", async () => expect(await getDateToByDateFrom("2025-09-01")).toBe("2025-09-07"));
test("getDateToByDateFrom(2025-01-27)", async () => expect(await getDateToByDateFrom("2025-01-27")).toBe("2025-02-02"));
test("getDateToByDateFrom(2025-02-24)", async () => expect(await getDateToByDateFrom("2025-02-24")).toBe("2025-03-02"));
test("getDateToByDateFrom(2025-03-24)", async () => expect(await getDateToByDateFrom("2025-03-24")).toBe("2025-03-30"));
test("getDateToByDateFrom(2025-03-31)", async () => expect(await getDateToByDateFrom("2025-03-31")).toBe("2025-04-06"));
test("getDateToByDateFrom(2025-05-26)", async () => expect(await getDateToByDateFrom("2025-05-26")).toBe("2025-06-01"));
test("getDateToByDateFrom(2025-06-30)", async () => expect(await getDateToByDateFrom("2025-06-30")).toBe("2025-07-06"));
test("getDateToByDateFrom(2025-07-21)", async () => expect(await getDateToByDateFrom("2025-07-21")).toBe("2025-07-27"));
test("getDateToByDateFrom(2025-12-29)", async () => expect(await getDateToByDateFrom("2025-12-29")).toBe("2026-01-04"));
test("getDateToByDateFrom(2025-11-24)", async () => expect(await getDateToByDateFrom("2025-11-24")).toBe("2025-11-30"));
test("getDateToByDateFrom(2025-10-27)", async () => expect(await getDateToByDateFrom("2025-10-27")).toBe("2025-11-02"));
test("getDateToByDateFrom(2025-10-27)", async () => expect(await getDateToByDateFrom("2025-10-27")).toBe("2025-11-02"));

//2024
test("getDateToByDateFrom(2024-01-29)", async () => expect(await getDateToByDateFrom("2024-01-29")).toBe("2024-02-04"));
test("getDateToByDateFrom(2024-02-26)", async () => expect(await getDateToByDateFrom("2024-02-26")).toBe("2024-03-03"));
test("getDateToByDateFrom(2024-02-19)", async () => expect(await getDateToByDateFrom("2024-02-19")).toBe("2024-02-25"));
test("getDateToByDateFrom(2024-03-25)", async () => expect(await getDateToByDateFrom("2024-03-25")).toBe("2024-03-31"));
test("getDateToByDateFrom(2024-04-29)", async () => expect(await getDateToByDateFrom("2024-04-29")).toBe("2024-05-05"));
test("getDateToByDateFrom(2024-04-22)", async () => expect(await getDateToByDateFrom("2024-04-22")).toBe("2024-04-28"));
test("getDateToByDateFrom(2024-10-28)", async () => expect(await getDateToByDateFrom("2024-10-28")).toBe("2024-11-03"));
test("getDateToByDateFrom(2024-12-30)", async () => expect(await getDateToByDateFrom("2024-12-30")).toBe("2025-01-05"));
test("getDateToByDateFrom(2024-09-23)", async () => expect(await getDateToByDateFrom("2024-09-23")).toBe("2024-09-29"));
