import { Service, Container, Inject } from "@rxdi/core";
import { constructorWatcherService, ConstructorWatcherService } from "@rxdi/core/services/constructor-watcher";
import { RoutesService } from "./routes.service";
import { Router } from "./history";

@Service()
export class ContextResolver {

    private moduleWatcher: ConstructorWatcherService = constructorWatcherService;
    @Inject(() => Router) private router: Router

    constructor(
        private routes: RoutesService,
        
    ) {}

    async resolve(path: string) {
        const currentRoute = this.routes.get().filter(r => r.path === path.replace('/', ''));
        if (!currentRoute.length) {
            this.router.navigate('/').subscribe();
            return await Promise.reject('missing-route');
        }
        const m = await currentRoute[0].component;
        Container.get(Object.keys(m).map(res => m[res])[0]);
        return await Promise.resolve(true);
    }

}