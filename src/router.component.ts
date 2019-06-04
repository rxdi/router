import { Component, Injector } from '@rxdi/core';
import { LitElement, customElement, html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { render } from 'lit-html';
import { RouterRoutlet, RouterInitialized } from './injection.tokens';

@customElement(RouterRoutlet)
@Component()
export class RouterComponent extends LitElement {
  @Injector(RouterRoutlet) private routerOutlet: RouterRoutlet;
  @Injector(RouterInitialized) private routerInitialized: RouterInitialized;

  @property() id: string = RouterRoutlet;
  @property() header: string = '';
  @property() footer: string = '';
  @property() unsafeHtml: string;

  connectedCallback() {
    super.connectedCallback();
    this.routerInitialized.next(this);
    if (this.unsafeHtml) {
      this.unsafeHtmlInsert();
    }
  }

  render() {
    return html`
      <header></header>
      <slot></slot>
      ${html`
        <main id="${this.id}"></main>
      `}
      <slot></slot>
      <footer></footer>
    `;
  }

  private unsafeHtmlInsert() {
    this.routerOutlet.subscribe(mounted => {
      if (mounted) {
        if (this.header) {
          render(
            html`
              ${unsafeHTML(this.header)}
            `,
            this.shadowRoot.querySelector('header')
          );
        }
        if (this.footer) {
          render(
            html`
              ${unsafeHTML(this.footer)}
            `,
            this.shadowRoot.querySelector('footer')
          );
        }
      }
    });
  }
}
