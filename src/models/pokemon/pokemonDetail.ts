export interface PokemonDetail {
    id: number;
    name: string;
    types: string[];
    abilities: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    height: number;
    weight: number;
    image: string;
}