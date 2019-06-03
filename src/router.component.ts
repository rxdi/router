import { Component, Container } from '@rxdi/core';
import {
  LitElement,
  customElement,
  html,
  property,
  TemplateResult
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { BehaviorSubject } from 'rxjs';
import { Outlet } from './outlet';

import { render } from 'lit-html';

@customElement('router-outlet')
@Component()
export class RouterComponent extends LitElement {
  private routerPlate: BehaviorSubject<Outlet> = Container.get('router-plate');
  private routerInitialized: BehaviorSubject<LitElement> = Container.get(
    'router-initialized'
  );

  @property() header: string = '';
  @property() footer: string = '';

  @property() outlet: TemplateResult = html`
    <main id="router-outlet"></main>
  `;
  connectedCallback() {
    super.connectedCallback();
    this.routerInitialized.next(this);
    this.routerPlate.subscribe(mounted => {
      if (mounted) {
        render(html`${unsafeHTML(this.header)}`, this.shadowRoot.querySelector('header'));
        render(html`${unsafeHTML(this.footer)}`, this.shadowRoot.querySelector('footer'));
      }
    });
  }

  render() {
    return html`<header></header>${this.outlet}<footer></footer>`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'router-outlet': RouterComponent;
  }
}
