var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ModuleService, Service, Inject } from '@rxdi/core';
import { Routes, RouterOptions } from './injection.tokens';
import { Outlet } from './outlet';
import { BehaviorSubject } from 'rxjs';
let RouterService = class RouterService {
    constructor(moduleService, routes, routerInitialized, routerPlate, routerOptions) {
        this.moduleService = moduleService;
        this.routes = routes;
        this.routerInitialized = routerInitialized;
        this.routerPlate = routerPlate;
        this.routerOptions = routerOptions;
        this.subscription = this.routerInitialized
            .asObservable()
            .subscribe((routerOutlet) => __awaiter(this, void 0, void 0, function* () {
            if (routerOutlet) {
                yield routerOutlet.requestUpdate();
                const el = routerOutlet.shadowRoot.querySelector('#router-outlet');
                const router = new Outlet(el, this.routerOptions);
                router.setRoutes(this.routes);
                this.routerPlate.next(router);
                this.subscription.unsubscribe();
            }
        }));
    }
    getMetaDescriptors() {
        const descriptors = [];
        Array.from(this.moduleService.watcherService._constructors.keys())
            .filter(key => {
            const clazz = this.moduleService.watcherService.getConstructor(key)['type']['metadata']['originalName'] === 'component';
            console.log(clazz);
            return clazz;
        })
            .map(key => {
            console.log(key);
            return this.moduleService.watcherService.getConstructor(key);
        })
            .forEach((map) => {
            // const outlet = Container.get(Outlet);
            // const routes = Container.get(Routes);
            // Container.get(RouterPlate).setRoutes(routes);
            debugger;
            // Container.get(RouterModule.forRoot('router-outlet', [
            //   {
            //     path: '/',
            //     component: 'test-component'
            //   },
            //   {
            //     path: '(.*)',
            //     component: 'not-found-component',
            //     action: () => import('../not-found/not-found.component')
            //   },
            //   //   { path: '/users/:user', component: 'x-user-profile' },
            // ]) as any);
            // return Array.from(map.type._descriptors.keys())
            //   .map((k) => map.type._descriptors.get(k))
            //   .map(d => d.value)
            //   .forEach(v => descriptors.push({ descriptor: v, self: map.value }));
        });
        return descriptors;
    }
};
RouterService = __decorate([
    Service(),
    __param(1, Inject(Routes)),
    __param(2, Inject('router-initialized')),
    __param(3, Inject('router-outlet')),
    __param(4, Inject(RouterOptions)),
    __metadata("design:paramtypes", [ModuleService, Array, BehaviorSubject,
        BehaviorSubject, Object])
], RouterService);
export { RouterService };
