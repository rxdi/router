import { RoutesService } from "./routes.service";
export declare class ContextResolver {
    private routes;
    private moduleWatcher;
    private router;
    constructor(routes: RoutesService);
    resolve(path: string): Promise<boolean>;
}
