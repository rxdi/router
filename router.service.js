var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Service } from "@rxdi/core";
import history from './history/history';
import { Observable, of, BehaviorSubject } from "rxjs";
let Router = class Router {
    constructor() {
        this.locationBar = new history();
        this.activatedRoute = new BehaviorSubject(null);
        setTimeout(() => {
            this.url = window.location.pathname;
            this.start({ pushState: true }).subscribe();
            this.activatedRoute.next(this.getSnapshot());
            this.navigate(this.url + window.location.search, { params: this.getAllUrlParams(this.url) });
        });
    }
    navigateInternal(route, options) {
        this.url = route;
        return of(this.locationBar.update(route, options));
    }
    navigate(route, options) {
        return this.navigateInternal(route, options);
    }
    onChange() {
        return new Observable(o => this.locationBar.onChange((p) => {
            o.next(p);
            return () => o.complete();
        }));
    }
    getQueryParams(qs) {
        qs = qs.split('+').join(' ');
        let params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }
    getSnapshot() {
        const path = this.url + window.location.search;
        return {
            route: path.split('?')[0],
            params: this.getAllUrlParams(path)
        };
    }
    getAllUrlParams(url) {
        let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        let obj = {};
        if (queryString) {
            queryString = queryString.split('#')[0];
            let arr = queryString.split('&');
            for (let i = 0; i < arr.length; i++) {
                let a = arr[i].split('=');
                let paramNum = undefined;
                let paramName = a[0].replace(/\[\d*\]/, function (v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });
                let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
                paramName = paramName.toLowerCase();
                paramValue = paramValue.toLowerCase();
                if (obj[paramName]) {
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    if (typeof paramNum === 'undefined') {
                        obj[paramName].push(paramValue);
                    }
                    else {
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                else {
                    obj[paramName] = paramValue;
                }
            }
        }
        return obj;
    }
    start(options) {
        this.locationBar.start(options);
        return of(true);
    }
    freeze() {
        this.navigate = () => null;
        return of(true);
    }
    unfreeze() {
        this.navigate = this.navigateInternal.bind(this);
        return of(true);
    }
};
Router = __decorate([
    Service(),
    __metadata("design:paramtypes", [])
], Router);
export { Router };
