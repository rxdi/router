var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injector } from '@rxdi/core';
import { render, LitElement, customElement, html, property } from '@rxdi/lit-html';
import { unsafeHTML } from '@rxdi/lit-html';
import { RouterRoutlet, RouterInitialized } from './injection.tokens';
let RouterComponent = class RouterComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.id = RouterRoutlet;
        this.header = '';
        this.footer = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.routerInitialized.next(this);
        if (this.unsafeHtml) {
            this.unsafeHtmlInsert();
        }
    }
    render() {
        return html `
      <header></header>
      <slot></slot>
      ${html `
        <main id="${this.id}"></main>
      `}
      <slot></slot>
      <footer></footer>
    `;
    }
    unsafeHtmlInsert() {
        this.routerOutlet.subscribe(mounted => {
            if (mounted) {
                if (this.header) {
                    render(html `
              ${unsafeHTML(this.header)}
            `, this.shadowRoot.querySelector('header'));
                }
                if (this.footer) {
                    render(html `
              ${unsafeHTML(this.footer)}
            `, this.shadowRoot.querySelector('footer'));
                }
            }
        });
    }
};
__decorate([
    Injector(RouterRoutlet),
    __metadata("design:type", Object)
], RouterComponent.prototype, "routerOutlet", void 0);
__decorate([
    Injector(RouterInitialized),
    __metadata("design:type", Object)
], RouterComponent.prototype, "routerInitialized", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "id", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "header", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "footer", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "unsafeHtml", void 0);
RouterComponent = __decorate([
    customElement(RouterRoutlet),
    Component()
], RouterComponent);
export { RouterComponent };
