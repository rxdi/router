import { InjectionToken } from "@rxdi/core";
import { Router } from '@vaadin/router';
export declare const VaadinRouter: InjectionToken<Router>;
export interface Route<C> {
    path: string;
    component: C;
    action?: () => Promise<any>;
}
