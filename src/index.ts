import { Module, ModuleWithServices, Container } from '@rxdi/core';
import { RouterService } from './router.service';
import { BehaviorSubject } from 'rxjs';
import { RouterComponent } from './router.component';
import {
  RouterOptions,
  Route,
  Routes,
  RouterRoutlet,
  RouterInitialized
} from './injection.tokens';

@Module()
export class RouterModule {
  public static forRoot<C>(
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
          provide: Routes,
          useValue: routes
        },
        {
          provide: RouterInitialized,
          useFactory: () => new BehaviorSubject(null)
        },
        {
          provide: RouterRoutlet,
          useFactory: () => new BehaviorSubject(null)
        },
        {
          provide: 'initRouter',
          deps: [RouterService],
          useFactory: (r: RouterService) => r
        }
      ],
      components: [RouterComponent]
    };
  }
}

export * from './injection.tokens';
export * from './outlet';
export * from './decorators';

declare global {
  interface HTMLElementTagNameMap {
    'router-outlet': RouterComponent;
  }
}
