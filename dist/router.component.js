"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const lit_html_1 = require("@rxdi/lit-html");
const lit_html_2 = require("@rxdi/lit-html");
const injection_tokens_1 = require("./injection.tokens");
let RouterComponent = class RouterComponent extends lit_html_1.LitElement {
    constructor() {
        super(...arguments);
        this.id = injection_tokens_1.RouterRoutlet;
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
        return lit_html_1.html `
      <header></header>
      <slot></slot>
      ${lit_html_1.html `
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
                    lit_html_1.render(lit_html_1.html `
              ${lit_html_2.unsafeHTML(this.header)}
            `, this.shadowRoot.querySelector('header'));
                }
                if (this.footer) {
                    lit_html_1.render(lit_html_1.html `
              ${lit_html_2.unsafeHTML(this.footer)}
            `, this.shadowRoot.querySelector('footer'));
                }
            }
        });
    }
};
__decorate([
    core_1.Injector(injection_tokens_1.RouterRoutlet),
    __metadata("design:type", Object)
], RouterComponent.prototype, "routerOutlet", void 0);
__decorate([
    core_1.Injector(injection_tokens_1.RouterInitialized),
    __metadata("design:type", Object)
], RouterComponent.prototype, "routerInitialized", void 0);
__decorate([
    lit_html_1.property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "id", void 0);
__decorate([
    lit_html_1.property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "header", void 0);
__decorate([
    lit_html_1.property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "footer", void 0);
__decorate([
    lit_html_1.property(),
    __metadata("design:type", String)
], RouterComponent.prototype, "unsafeHtml", void 0);
RouterComponent = __decorate([
    lit_html_1.customElement(injection_tokens_1.RouterRoutlet),
    core_1.Component()
], RouterComponent);
exports.RouterComponent = RouterComponent;
