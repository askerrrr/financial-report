import { test, expect } from "@jest/globals";
import hasPeriodOverlap from "../services/hasPeriodOverlap.js";

test("hasPeriodOverlap(2025, 12, 29)", () => expect(hasPeriodOverlap(2025, 12, 29)).toEqual(true));
test("hasPeriodOverlap(2025, 05, 12)", () => expect(hasPeriodOverlap(2025, 5, 12)).toEqual(false));
test("hasPeriodOverlap(2025, 09, 22)", () => expect(hasPeriodOverlap(2025, 9, 22)).toEqual(false));
test("hasPeriodOverlap(2025, 6, 30)", () => expect(hasPeriodOverlap(2025, 6, 30)).toEqual(true));
test("hasPeriodOverlap(2025, 09, 27)", () => expect(hasPeriodOverlap(2025, 9, 27)).toEqual(true));
test("hasPeriodOverlap(2025, 11, 24)", () => expect(hasPeriodOverlap(2025, 11, 24)).toEqual(false));
test("hasPeriodOverlap(2025, 06, 23)", () => expect(hasPeriodOverlap(2025, 6, 23)).toEqual(false));
test("hasPeriodOverlap(2025, 03, 24)", () => expect(hasPeriodOverlap(2025, 3, 24)).toEqual(false));
test("hasPeriodOverlap(2025, 08, 25)", () => expect(hasPeriodOverlap(2025, 8, 25)).toEqual(false));
test("hasPeriodOverlap(2025, 1, 27)", () => expect(hasPeriodOverlap(2025, 1, 27)).toEqual(true));
