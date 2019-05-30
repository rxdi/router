# Router module for client side rxdi application

#### Install
```bash
npm i @rxdi/router
```

#### Define inside `index.html`

```html
<body>
  <header>
    <h1>Hello world</h1>
  </header>
  <nav>
    <a href="/">Home</a>
    <a href="/not-found">Not found component</a>
  </nav>
  <main id="outlet">
    <!-- Here Vaadin.Router inserts the current page content -->
  </main>
</body>
```

#### Define routes with forRoot these will be evaluated lazy

```typescript
import { Module } from '@rxdi/core';
import { RouterModule } from '@rxdi/router';

@Module({
  imports: [
    RouterModule.forRoot('outlet', [
      {
        path: '/',
        component: 'app-component',
        action: () => import('./app.component')
      },
      {
        path: '(.*)',
        component: 'not-found-component',
        action: () => import('./not-found/not-found.component')
      },
      {
        path: '/not-found',
        component: 'not-found-component',
        action: () => import('./not-found/not-found.component')
      }
      //   { path: '/users/:user', component: 'x-user-profile' },
      //   { path: '(.*)', component: 'x-not-found-view' }
    ])
  ]
})
export class AppModule {}

```
