import { Module, ModuleWithServices, Container } from '@rxdi/core';
import { Route, Routes, RouterOptions } from './injection.tokens';
import { RouterService } from './router.service';
import { BehaviorSubject } from 'rxjs';
import { RouterComponent } from './router.component';

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
          provide: 'router-initialized',
          useFactory: () => new BehaviorSubject(null)
        },
        {
          provide: 'router-plate',
          useFactory: () => new BehaviorSubject(null)
        },
        {
          provide: 'initRouter',
          deps: [RouterService],
          useFactory: (res: RouterService) => res
        }
      ],
      components: [RouterComponent]
    };
  }
}

export * from './injection.tokens';
export * from './outlet';


