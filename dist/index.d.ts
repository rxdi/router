import { ModuleWithServices } from '@rxdi/core';
export declare class RouterModule {
    static forRoot(element: string, routes: {
        path: string;
        component: string;
        action?: () => Promise<any>;
    }[]): ModuleWithServices;
}
