import { EnumCharacterGenderId, EnumCharacterStatusId } from "../enums/character.enum";

export interface CharacterOriginModel {
    name: string;
    url: string;
}

export interface CharacterLocationModel {
    name: string;
    url: string;
}

export interface CharacterModel {
    id: number;
    name: string;
    status: EnumCharacterStatusId;
    species: string;
    type: string;
    gender: EnumCharacterGenderId;
    origin: CharacterOriginModel;
    location: CharacterLocationModel;
    image: string;
    episode: string[];
    url: string;
    created: string;
}