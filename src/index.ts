import { Module, ModuleWithServices } from '@rxdi/core';
import { Router } from '@vaadin/router';

@Module()
export class RouterModule {
  public static forRoot(
    element: string,
    routes: { path: string; component: string; action?: () => Promise<any> }[]
  ): ModuleWithServices {
    return {
      module: RouterModule,
      services: [
        {
          provide: 'vaadin-router',
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