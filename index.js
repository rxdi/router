var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RouterModule_1;
import { Module } from "@rxdi/core";
import { ContextResolver } from "./context-resolver.service";
import { Router } from "./router.service";
import { RoutesService } from "./routes.service";
let RouterModule = RouterModule_1 = class RouterModule {
    static forRoot(r) {
        return {
            module: RouterModule_1,
            services: [
                {
                    provide: RoutesService,
                    deps: [RoutesService],
                    useFactory: (routesService) => routesService.set(r)
                },
                ...r.map(val => ({ provide: `rxdi-route-${val.path}`, useFactory: () => val.component })),
                ContextResolver,
                Router
            ]
        };
    }
};
RouterModule = RouterModule_1 = __decorate([
    Module()
], RouterModule);
export { RouterModule };
export * from './context-resolver.service';
export { Route } from './route.model';
export * from './history/index';
export * from './routes.service';
export * from './decorators/index';
