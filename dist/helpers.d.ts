import { BehaviorSubject } from 'rxjs';
import { Route } from './injection.tokens';
export declare const ChildRoutesObservable: BehaviorSubject<any>;
export declare function loadRoutes(routes: Route[]): Route<any>[];
