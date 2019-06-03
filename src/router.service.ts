import { ModuleService, Service, Inject } from '@rxdi/core';
import { Routes, Route } from './injection.tokens';
import { RouterPlate } from './router-plate';
import { LitElement } from 'lit-element';
import { BehaviorSubject, Subscription } from 'rxjs';

@Service()
export class RouterService {
  private subscription: Subscription;
  constructor(
    private moduleService: ModuleService,
    @Inject(Routes) private routes: Route<any>[],
    @Inject('router-initialized') private routerInitialized: BehaviorSubject<LitElement>,
    @Inject('router-plate') private routerPlate: BehaviorSubject<RouterPlate>
  ) {
    this.subscription = this.routerInitialized
      .asObservable()
      .subscribe(async routerOutlet => {
        if (routerOutlet) {
          await routerOutlet.requestUpdate();
          const el = routerOutlet.shadowRoot.querySelector('#router-outlet');
          const router = new RouterPlate(el, { baseUrl: '/' });
          router.setRoutes(this.routes);
          this.routerPlate.next(router);
          this.subscription.unsubscribe();
        }
      });
  }

  getMetaDescriptors(): any[] {
    const descriptors: any[] = [];
    Array.from(this.moduleService.watcherService._constructors.keys())
      .filter(key => {
        const clazz =
          this.moduleService.watcherService.getConstructor(key)['type'][
            'metadata'
          ]['originalName'] === 'component';
          console.log(clazz);
        return clazz;
      })
      .map(key => {
        console.log(key);
        return this.moduleService.watcherService.getConstructor(key) as unknown;
      })
      .forEach((map: any) => {
        // const outlet = Container.get(Outlet);
        // const routes = Container.get(Routes);
        // Container.get(RouterPlate).setRoutes(routes);
        debugger;
        // Container.get(RouterModule.forRoot('router-outlet', [
        //   {
        //     path: '/',
        //     component: 'test-component'
        //   },
        //   {
        //     path: '(.*)',
        //     component: 'not-found-component',
        //     action: () => import('../not-found/not-found.component')
        //   },
        //   //   { path: '/users/:user', component: 'x-user-profile' },
        // ]) as any);
        // return Array.from(map.type._descriptors.keys())
        //   .map((k) => map.type._descriptors.get(k))
        //   .map(d => d.value)
        //   .forEach(v => descriptors.push({ descriptor: v, self: map.value }));
      });
    return descriptors;
  }
}
