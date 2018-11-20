var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Service, Container } from "@rxdi/core";
import { RoutesService } from "./routes.service";
import { Router } from "./history";
let ContextResolver = class ContextResolver {
    constructor(routes, router) {
        this.routes = routes;
        this.router = router;
        this.router.onChange()
            .subscribe(() => __awaiter(this, void 0, void 0, function* () {
            const snapshot = this.router.getSnapshot();
            this.router.activatedRoute.next(snapshot);
            yield this.resolve(snapshot.route);
        }));
    }
    resolve(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentRoute = this.routes.get().filter(r => r.path === path.replace('/', ''));
            if (!currentRoute.length) {
                this.router.navigate('/').subscribe();
                return yield Promise.reject('missing-route');
            }
            const m = yield currentRoute[0].component;
            Container.get(Object.keys(m).map(res => m[res])[0]);
            return yield Promise.resolve(true);
        });
    }
};
ContextResolver = __decorate([
    Service(),
    __metadata("design:paramtypes", [RoutesService,
        Router])
], ContextResolver);
export { ContextResolver };
