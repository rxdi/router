var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RouterModule_1;
import { Module, Container } from '@rxdi/core';
import { Outlet, Routes, RouterOptions } from './injection.tokens';
import { RouterPlate } from './router-plate';
let RouterModule = RouterModule_1 = class RouterModule {
    static forRoot(element, routes, options) {
        return {
            module: RouterModule_1,
            services: [
                {
                    provide: RouterOptions,
                    useValue: options || {}
                },
                {
                    provide: Outlet,
                    useValue: element
                },
                {
                    provide: Routes,
                    deps: [RouterPlate],
                    useFactory: (router) => {
                        router.setRoutes(routes);
                        return router;
                    }
                },
                RouterPlate,
            ]
        };
    }
};
RouterModule = RouterModule_1 = __decorate([
    Module()
], RouterModule);
export { RouterModule };
export * from './injection.tokens';
export * from './router-plate';
export const Router = () => Container.get(RouterPlate);
