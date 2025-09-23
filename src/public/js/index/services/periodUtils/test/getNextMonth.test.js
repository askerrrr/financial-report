import { test, expect } from "@jest/globals";
import getNextMonth from "../services/getNextMonth.js";

test("getNextMonth(1)", () => expect(getNextMonth(1)).toEqual({ nextMonth: "02" }));
test("getNextMonth(2)", () => expect(getNextMonth(2)).toEqual({ nextMonth: "03" }));
test("getNextMonth(3)", () => expect(getNextMonth(3)).toEqual({ nextMonth: "04" }));
test("getNextMonth(4)", () => expect(getNextMonth(4)).toEqual({ nextMonth: "05" }));
test("getNextMonth(5)", () => expect(getNextMonth(5)).toEqual({ nextMonth: "06" }));
test("getNextMonth(6)", () => expect(getNextMonth(6)).toEqual({ nextMonth: "07" }));
test("getNextMonth(7)", () => expect(getNextMonth(7)).toEqual({ nextMonth: "08" }));
test("getNextMonth(8)", () => expect(getNextMonth(8)).toEqual({ nextMonth: "09" }));
test("getNextMonth(9)", () => expect(getNextMonth(9)).toEqual({ nextMonth: "10" }));
test("getNextMonth(11)", () => expect(getNextMonth(10)).toEqual({ nextMonth: "11" }));
test("getNextMonth(12)", () => expect(getNextMonth(11)).toEqual({ nextMonth: "12" }));
