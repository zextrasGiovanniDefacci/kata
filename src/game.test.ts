import {describe, expect, test} from "vitest";
import {createCharacter, dealDamage, DEFAULT_CHARACTER, heal, isAlive, maxRange} from "./game";

const sourceCharacter = createCharacter({ type: "Melee", health: 100, level: 1});

describe("game", () => {
    test("a character with health > 0 it should be alive", () => {
        expect(isAlive(createCharacter({ type: "Melee", health: 42, level: 1}))).toBe(true);
    })

    test("a character with health == 0 it should not be alive", () => {
        expect(isAlive(createCharacter({ type: "Melee", health: 0, level: 1}))).toBe(false);
    })

    test("deal damage exceeding health value make health equal to 0", () => {
        expect(dealDamage(sourceCharacter, createCharacter({ type: "Melee", health: 21, level: 1}), 42)).toMatchObject({ type: "Melee", health: 0, level: 1});
    })

    test('deal damage must decrease health value', () => {
        expect(dealDamage(sourceCharacter, createCharacter({ type: "Melee", health: 100, level: 1}), 42)).toMatchObject({ type: "Melee", health: 58, level: 1});
    })

    test("after 'health' health value cannot exceed 1000", () => {
        expect(heal(createCharacter({ type: "Melee", health: 990, level: 1}), 42)).toMatchObject({ type: "Melee", health: 1000, level: 1});
    })

    test('heal must increase health value', () => {
        expect(heal(createCharacter({ type: "Melee", health: 900, level: 1}), 42)).toMatchObject({ type: "Melee", health: 942, level: 1});
    })

    test('should create a character with default value when call createCharacter function ', () => {
        expect(createCharacter()).toMatchObject(DEFAULT_CHARACTER);
    });

    test('deal damage should not be applied when source character is the same as target character', () => {
        const character = createCharacter({ type: "Melee", health: 100, level: 1});
        expect(dealDamage(character, character, 42)).toMatchObject({ type: "Melee", health: 100, level: 1});
    })

    test('if the target is 5 or more Levels above the attacker, Damage is reduced by 50%', () => {
        expect(dealDamage(sourceCharacter, createCharacter({ type: "Melee", health: 100, level: 7}), 42)).toMatchObject({ type: "Melee", health: 79, level: 7});
    }) 

    test('If the target is 5 or more Levels below the attacker, Damage is increased by 50%', () => {
        expect(dealDamage({...sourceCharacter, level:7}, createCharacter({ type: "Melee", health: 100, level: 1}), 42)).toMatchObject({ type: "Melee", health: 16, level: 1});
    }) 

    test('if the target is 5 Levels above the attacker, Damage is reduced by 50%', () => {
        expect(dealDamage(sourceCharacter, createCharacter({ type: "Melee", health: 100, level: 6}), 42)).toMatchObject({ type: "Melee", health: 79, level: 6});
    }) 

    test('If the target is 5 Levels below the attacker, Damage is increased by 50%', () => {
        expect(dealDamage({...sourceCharacter, level:6}, createCharacter({ type: "Melee", health: 100, level: 1}), 42)).toMatchObject({ type: "Melee", health: 16, level: 1});
    }) 

    test('Melee Max Range is 2', () => {
        expect(maxRange(createCharacter({ type: "Melee", health: 100, level: 1}))).toBe(2);
    }) 

    test('Ranged Max Range is 20', () => {
        expect(maxRange(createCharacter({ type: "Ranged", health: 100, level: 1}))).toBe(20);
    }) 
});
