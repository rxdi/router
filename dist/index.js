var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RouterModule_1;
import { Module } from '@rxdi/core';
import { Routes, RouterOptions } from './injection.tokens';
import { RouterService } from './router.service';
import { BehaviorSubject } from 'rxjs';
import { RouterComponent } from './router.component';
let RouterModule = RouterModule_1 = class RouterModule {
    static forRoot(routes, options) {
        return {
            module: RouterModule_1,
            services: [
                {
                    provide: RouterOptions,
                    useValue: options || {}
                },
                {
                    provide: Routes,
                    useValue: routes
                },
                {
                    provide: 'router-initialized',
                    useFactory: () => new BehaviorSubject(null)
                },
                {
                    provide: 'router-outlet',
                    useFactory: () => new BehaviorSubject(null)
                },
                {
                    provide: 'initRouter',
                    deps: [RouterService],
                    useFactory: (res) => res
                }
            ],
            components: [RouterComponent]
        };
    }
};
RouterModule = RouterModule_1 = __decorate([
    Module()
], RouterModule);
export { RouterModule };
export * from './injection.tokens';
export * from './outlet';
