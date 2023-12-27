import { InfoModel } from "./info.model";

export interface RickMortyResponseModel<T> {
    info: InfoModel;
    results: T[];
}