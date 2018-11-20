# Router module for client side rxdi application

#### Install
```bash
npm i @rxdi/router
```

#### Define routes with forRoot these will be evaluated lazy

```typescript
import { Module } from "@rxdi/core";
import { RouterModule } from "@rxdi/router";

@Module({
    imports: [
        RouterModule.forRoot([
            {
                path: 'home', component: import('./app.component')
            },
            {
                path: 'some/url', component: import('./test.component')
            },
        ])
    ]
})
export class AppModule {}
```

#### Get Route parameters from the resolved component

```typescript
import { Component} from "@rxdi/core";
import { h, render, Component as PreactComponent } from 'preact';
import { HelloProps, HelloState } from "./app.model";
import { RouteParams, Debounce } from "@rxdi/router";

@Component()
export class AppComponent extends PreactComponent<HelloProps, HelloState> {

    @RouteParams()
    @Debounce(5000)
    OnBefore(params: RouteParams) {
        render(<AppComponent compiler="TypeScript" framework="PReact" rxdi="@rxdi" routeParams={params} />, document.getElementById('app'));
    }

    render(props: HelloProps, ) {
        return <div>
            <h1>Hello from {this.props.compiler}, {this.props.framework} and {this.props.rxdi}!</h1>
            <h1>Reactive Service Counter: {this.state && this.state.value}</h1>
        </div>;
    }

    componentDidMount() {}

    componentWillUnmount() {}

}
```

#### Decorators

@RouteParams() - Will inject parameters passed from the route to first argument OnBefore(params: RouteParams);
@Debounce(5000) - This will make your component with delayed render 5 seconds

#### Interfaces

RouteParams =  {
    route: string;
    params: {[key: string]: string};
}


#### Error handling

- For now when route doesn't match it will reject promise and redirect to '/'
