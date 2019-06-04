import { LitElement } from 'lit-element';
export declare class RouterComponent extends LitElement {
    private routerOutlet;
    private routerInitialized;
    id: string;
    header: string;
    footer: string;
    unsafeHtml: string;
    connectedCallback(): void;
    render(): import("lit-element").TemplateResult;
    private unsafeHtmlInsert;
}
