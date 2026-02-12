import {describe, expect, test} from "vitest";
import {createCharacter, dealDamage, DEFAULT_CHARACTER, heal, isAlive, MAX_HEALTH_VALUE} from "./game";

describe("game", () => {
    test("a character with health > 0 it should be alive", () => {
        expect(isAlive({ health: 42, level: 1})).toBe(true);
    })

    test("a character with health == 0 it should not be alive", () => {
        expect(isAlive({ health: 0, level: 1})).toBe(false);
    })

    test("deal damage exceeding health value make health equal to 0", () => {
        expect(dealDamage({ health: 21, level: 1}, 42)).toMatchObject({ health: 0, level: 1});
    })

    test('deal damage must decrease health value', () => {
        expect(dealDamage({ health: 100, level: 1}, 42)).toMatchObject({ health: 58, level: 1});
    })

    test("after 'health' health value cannot exceed 1000", () => {
        expect(heal({ health: 990, level: 1}, 42)).toMatchObject({ health: MAX_HEALTH_VALUE, level: 1});
    })

    test('heal must increase health value', () => {
        expect(heal({ health: 900, level: 1}, 42)).toMatchObject({ health: 942, level: 1});
    })

    test('should create a character with default value when call createCharacter function ', () => {
        expect(createCharacter()).toMatchObject(DEFAULT_CHARACTER);
    });

});
