import { Module, ModuleWithServices } from '@rxdi/core';
import { Router } from '@vaadin/router';
import { VaadinRouter, Route } from './injection.tokens';

@Module()
export class RouterModule {
  public static forRoot<C>(
    element: string,
    routes: Route<C>[]
  ): ModuleWithServices {
    return {
      module: RouterModule,
      services: [
        {
          provide: VaadinRouter,
          useFactory: () => {
            const router = new Router(document.getElementById(element));
            router.setRoutes(routes);
            return router;
          }
        }
      ]
    };
  }
}

export * from './injection.tokens';