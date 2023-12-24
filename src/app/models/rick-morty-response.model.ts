import { CharacterModel } from "./character.model";
import { InfoModel } from "./info.model";

export interface RickMortyResponseModel {
    info: InfoModel;
    results: CharacterModel[];
}