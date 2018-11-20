import { RoutesService } from "./routes.service";
import { Router } from "./history";
export declare class ContextResolver {
    private routes;
    private router;
    constructor(routes: RoutesService, router: Router);
    resolve(path: string): Promise<boolean>;
}
