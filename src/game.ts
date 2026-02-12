export const DEFAULT_CHARACTER: Character = {
    health: 1000,
    level: 1,
};

export type Character = {
    health: number
    level: number
}

export function createCharacter(): Character {
    return {...DEFAULT_CHARACTER};
}

export function isAlive({health}:Character):boolean {
    return health > 0; 
}

export function dealDamage(targetCharacter:Character, damage:number):Character {
    const health = targetCharacter.health - damage;
    return {
        ...targetCharacter,
        health: health < 0 ? 0 : health,
    }
}

export const MAX_HEALTH_VALUE = 1000;

export function heal(targetCharacter:Character, heal:number):Character {
    const health = targetCharacter.health + heal;
    return {
        ...targetCharacter,
        health: health > MAX_HEALTH_VALUE ? 1000 : health,
    }
}