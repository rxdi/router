"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const core_1 = require("@rxdi/core");
exports.ChildRoutesObservable = new rxjs_1.BehaviorSubject(null);
function assignChildren(route) {
    if (route.children && typeof route.children === 'function') {
        const lazyModule = route.children;
        route.children = function (context, commands) {
            return __awaiter(this, void 0, void 0, function* () {
                yield lazyModule(context, commands);
                return exports.ChildRoutesObservable.getValue();
            });
        };
    }
    return route;
}
function assignAction(route) {
    if (route.canActivate) {
        const guard = core_1.Container.get(route.canActivate);
        if (route.action) {
            const originalAction = route.action;
            route.action = function (context, commands) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield originalAction(context, commands);
                    return guard.canActivate.bind(guard)(context, commands);
                });
            };
        }
        else {
            route.action = guard.canActivate.bind(guard);
        }
    }
    return route;
}
function assignStaticIs(route) {
    if (typeof route.component === 'function') {
        route.component = route.component.is();
    }
    return route;
}
function loadRoutes(routes) {
    const r = [...routes].map(route => assignStaticIs(assignAction(assignChildren(route))));
    exports.ChildRoutesObservable.next(null);
    return r;
}
exports.loadRoutes = loadRoutes;
