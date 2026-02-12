export const DEFAULT_CHARACTER = {
    health: 1000,
    level: 1,
} as const;

export type Character = {
    health: number
    level: number
    id: string
}

export function createCharacter(value: Omit<Character, 'id'> = DEFAULT_CHARACTER): Character {
    return {...value, id: crypto.randomUUID()};
}

export function isAlive({health}:Character):boolean {
    return health > 0; 
}

export function dealDamage(sourceCharacter: Character, targetCharacter:Character, damage:number):Character {
    if(sourceCharacter.id === targetCharacter.id) {
        return targetCharacter;
    }
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