import { Module, ModuleWithServices } from '@rxdi/core';
import { Route, Outlet, Routes, RouterOptions } from './injection.tokens';
import { Router } from './router';

@Module()
export class RouterModule {
  public static forRoot<C>(
    element: string,
    routes: Route<C>[],
    options?: RouterOptions
  ): ModuleWithServices {
    return {
      module: RouterModule,
      services: [
        {
          provide: RouterOptions,
          useValue: options || {}
        },
        {
          provide: Outlet,
          useValue: element
        },
        {
          provide: Routes,
          deps: [Router],
          useFactory: (router: Router) => {
            router.setRoutes(routes);
            return router;
          }
        },
        Router,
      ]
    };
  }
}

export * from './injection.tokens';
export * from './router';