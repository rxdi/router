var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Container } from '@rxdi/core';
import { LitElement, customElement, html, property, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { render } from 'lit-html';
let RouterComponent = class RouterComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.routerPlate = Container.get('router-plate');
        this.routerInitialized = Container.get('router-initialized');
        this.header = '';
        this.footer = '';
        this.outlet = html `
    <main id="router-outlet"></main>
  `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.routerInitialized.next(this);
        this.routerPlate.subscribe(mounted => {
            if (mounted) {
                render(html `${unsafeHTML(this.header)}`, this.shadowRoot.querySelector('header'));
                render(html `${unsafeHTML(this.footer)}`, this.shadowRoot.querySelector('footer'));
            }
        });
    }
    render() {
        return html `<header></header>${this.outlet}<footer></footer>`;
    }
};
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
    __metadata("design:type", TemplateResult)
], RouterComponent.prototype, "outlet", void 0);
RouterComponent = __decorate([
    customElement('router-outlet'),
    Component()
], RouterComponent);
export { RouterComponent };
