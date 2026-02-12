import { expect, test } from "vitest";
import { dealDamage, heal, isAlive, MAX_HEALTH_VALUE } from "./game";


test("a character with health > 0 it should be alive", () => {
    expect(isAlive({ health: 42, level: 1})).toBe(true);
})

test("a character with health == 0 it should not be alive", () => {
    expect(isAlive({ health: 0, level: 1})).toBe(false);
})

test("deal damage exceiding health value make health equal to 0", () => {
  expect(dealDamage({ health: 21, level: 1}, 42)).toMatchObject({ health: 0, level: 1});
})

test("after 'health' health value cannot exceed 1000", () => {
  expect(heal({ health: 990, level: 1}, 42)).toMatchObject({ health: MAX_HEALTH_VALUE, level: 1});
})