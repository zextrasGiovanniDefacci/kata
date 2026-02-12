export const DEFAULT_CHARACTER = {
    health: 1000,
    level: 1,
} as const;

export type Character = {
    health: number
    level: number
    id: string
    type: "Melee" | "Ranged"
}

function createCharacter(value: Omit<Character, 'id'>): Character {
    return {...value, id: crypto.randomUUID()};
}

export function createMeleeCharacter(value: Omit<Character, 'id' | 'type'> = DEFAULT_CHARACTER): Character {
    return createCharacter({...value, type: "Melee"});
}

export function createRangedCharacter(value: Omit<Character, 'id' | 'type'> = DEFAULT_CHARACTER): Character {
    return createCharacter({...value, type: "Ranged"});
}

export function isAlive({health}:Character):boolean {
    return health > 0; 
}

export function dealDamage(sourceCharacter: Character, targetCharacter:Character, damage:number, distance: number = 1):Character {
    if(sourceCharacter.id === targetCharacter.id) {
        return targetCharacter;
    }
    if (distance > maxRange(sourceCharacter)) {
        return targetCharacter;
    }
    const realDamage = (sourceCharacter.level - targetCharacter.level) >= 5 ? damage * 2 :
        (targetCharacter.level - sourceCharacter.level) >= 5 ? damage / 2 : damage; 
    const health = targetCharacter.health - realDamage;
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


export function maxRange(character:Character) {
    return (character.type === "Melee") ? MELEE_MAX_RANGE: RANGED_MAX_RANGE;
}

export const MELEE_MAX_RANGE = 2;
export const RANGED_MAX_RANGE = 20;