import { LitElement, TemplateResult } from 'lit-element';
export declare class RouterComponent extends LitElement {
    private routerOutlet;
    private routerInitialized;
    header: string;
    footer: string;
    outlet: TemplateResult;
    connectedCallback(): void;
    render(): TemplateResult;
}
