import { Module, ModuleWithServices, Container } from '@rxdi/core';
import { Route, Outlet, Routes, RouterOptions } from './injection.tokens';
import { RouterPlate } from './router-plate';

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
          deps: [RouterPlate],
          useFactory: (router: RouterPlate) => {
            router.setRoutes(routes);
            return router;
          }
        },
        RouterPlate,
      ]
    };
  }
}

export * from './injection.tokens';
export * from './router-plate';

export const Router = () => Container.get(RouterPlate);


