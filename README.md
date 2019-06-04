# Router module for client side rxdi application

### [Starter application](https://github.com/rxdi/starter-client-lit-html)

#### Install
```bash
npm i @rxdi/router
```


#### Define routes with forRoot these will be evaluated lazy

```typescript
import { Module } from '@rxdi/core';
import { GraphqlModule } from '@rxdi/graphql-client';
import { RouterModule } from '@rxdi/router';
import { DOCUMENTS } from './@introspection/documents';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Components } from './shared/components';
import { State } from './app.state';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Module({
  components: [
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot<Components>([
      {
        path: '/',
        component: 'home-component'
      },
      {
        path: '/about',
        component: 'about-component',
        action: () => import('./about/about.component')
      },
      {
        path: '/about/image-:size(\\d+)px',
        component: 'about-component',
        action: () => import('./about/about.component')
      },
      {
        path: '(.*)',
        component: 'not-found-component',
        action: () => import('./not-found/not-found.component')
      }
      //   { path: '/users/:user', component: 'x-user-profile' },
    ], { log: true })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

```


#### Import `<router-outlet></router-outlet>` inside `AppComponent`

```typescript
import { Inject } from '@rxdi/core';
import { html, render, customElement } from '@rxdi/lit-html';

@customElement('app-component')
export class AppComponent extends HTMLElement {
  OnInit() {
    render(
      html`
        <router-outlet></router-outlet>
      `,
      document.body
    );
  }
}

```

#### Another way of importing router you should define inside `index.html`

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



#### Getting Route parameters using Typescript Decorator

> {path: '/profile/:name', component: 'x-user-profile'},

```typescript


import { customElement, LitElement } from '@rxdi/lit-html';

@customElement('x-user-profile')
export class UserProfile extends LitElement {

  @RouteParams()
  params: { name: string }

  render() {
    return html`${this.params.name}`;
  }
}
```