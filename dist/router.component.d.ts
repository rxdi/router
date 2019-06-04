import { LitElement } from '@rxdi/lit-html';
export declare class RouterComponent extends LitElement {
    private routerOutlet;
    private routerInitialized;
    id: string;
    header: string;
    footer: string;
    unsafeHtml: string;
    connectedCallback(): void;
    render(): import("@rxdi/lit-html").TemplateResult;
    private unsafeHtmlInsert;
}
