import { Route } from "./route.model";
export declare class RoutesService {
    private _paths;
    set(paths: Route[]): void;
    get(): Route[];
}
