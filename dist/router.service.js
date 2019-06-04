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
import { Service, Inject } from '@rxdi/core';
import { Outlet } from './outlet';
import { Routes, RouterOptions, RouterRoutlet, RouterInitialized } from './injection.tokens';
let RouterService = class RouterService {
    constructor(routes, routerOptions, routerInitialized, routerPlate) {
        this.routes = routes;
        this.routerOptions = routerOptions;
        this.routerInitialized = routerInitialized;
        this.routerPlate = routerPlate;
        this.subscription = this.routerInitialized
            .asObservable()
            .subscribe((routerOutlet) => __awaiter(this, void 0, void 0, function* () {
            if (routerOutlet) {
                yield routerOutlet.requestUpdate();
                const el = routerOutlet.shadowRoot.querySelector(`#${routerOutlet.id}`);
                const router = new Outlet(el, this.routerOptions);
                router.setRoutes(this.routes);
                this.routerPlate.next(router);
                this.subscription.unsubscribe();
            }
        }));
    }
};
RouterService = __decorate([
    Service(),
    __param(0, Inject(Routes)),
    __param(1, Inject(RouterOptions)),
    __param(2, Inject(RouterInitialized)),
    __param(3, Inject(RouterRoutlet)),
    __metadata("design:paramtypes", [Array, Object, Object, Object])
], RouterService);
export { RouterService };
