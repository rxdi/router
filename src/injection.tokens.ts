import { InjectionToken } from "@rxdi/core";
import { Router } from '@vaadin/router';

export const VaadinRouter = new InjectionToken<Router>('vaadin-router');
export interface Route<C> {
    path: string;
    component: C;
    action?: () => Promise<any>;
  }
  